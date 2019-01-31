let science = require('science')

export function Thresholding (data, resolution = 1, scope = 3) {
  this.data = data
  // this.kde = science.stats.kde().kernel(halfGaussian).sample(data)
  this.kde = truncGaussKDE().sample(data)
  this.mean = science.stats.mean(this.data)
  this.variance = science.stats.variance(this.data)
  this.sd = Math.sqrt(this.variance)
  this.scope = scope
  this.resolution = resolution
  this.range = range(round(this.mean - this.scope * this.sd, this.resolution), round(this.mean + this.scope * this.sd, this.resolution), this.resolution)
  this.pdfEval = function (x) {
    return this.kde([x])[0][1]
  }
  this.pdf = function () {
    let xVals = this.range
    let pdf = this.kde(xVals)
    let yVals = []
    for (let i in pdf) {
      yVals.push(pdf[i][1])
    }
    return {x: xVals, y: yVals}
  }
  this.cdf = function () {
    let pdf = this.pdf()
    let cdf = []
    for (let i = 0; i < pdf.y.length; i++) {
      if (i === 0) {
        cdf.push(pdf.y[i])
      } else {
        cdf.push(cdf[cdf.length - 1] + pdf.y[i])
      }
    }
    return {x: pdf.x, y: cdf}
  }
  this.condenseData = function () {
    let xVals = this.range
    let yVals = new Array(xVals.length).fill(0)
    for (let i in this.data) {
      yVals[closestIndex(this.data[i], xVals)]++
    }
    return {x: xVals, y: yVals}
  }
  this.percentile = function (x) {
    x = x / 100
    let cdf = this.cdf()
    return cdf.x[closestIndex(x, cdf.y)]
  }
}

function range (start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1
  return Array(len).fill().map((_, idx) => start + (idx * step))
}

function closestIndex (num, arr) {
  let mid
  let lo = 0
  let hi = arr.length - 1
  while (hi - lo > 1) {
    mid = Math.floor((lo + hi) / 2)
    if (arr[mid] < num) {
      lo = mid
    } else {
      hi = mid
    }
  }
  if (num - arr[lo] <= arr[hi] - num) {
    return lo
  }
  return hi
}

function round (value, step) {
  step || (step = 1.0)
  var inv = 1.0 / step
  return Math.round(value * inv) / inv
}

/* eslint-disable-next-line */
function halfGaussian (x) {
  if (x >= 0) {
    return science.stats.kernel.gaussian(x)
  } else {
    return 0
  }
}

function truncGaussian (x, u, bw) {
  let val = science.stats.kernel.gaussian((x - u) / bw)
  if (x >= 0) {
    return val / (1 - 0.5 * (1 + science.stats.erf((0 - u) / Math.sqrt(2))))
  } else {
    return 0
  }
}

function truncGaussKDE () {
  let kernel = science.stats.kernel.gaussian,
    sample = [],
    bandwidth = science.stats.bandwidth.nrd

  function kde (points, i) {
    let bw = bandwidth.call(this, sample)
    return points.map(function (x) {
      let i = -1,
        y = 0,
        n = sample.length
      while (++i < n) {
        // y += kernel((x - sample[i]) / bw)
        y += truncGaussian(x, sample[i], bw)
      }
      return [x, y / bw / n]
    })
  }

  kde.kernel = function (x) {
    if (!arguments.length) return kernel
    kernel = x
    return kde
  }

  kde.sample = function (x) {
    if (!arguments.length) return sample
    sample = x
    return kde
  }

  kde.bandwidth = function (x) {
    if (!arguments.length) return bandwidth
    bandwidth = science.functor(x)
    return kde
  }

  return kde
};

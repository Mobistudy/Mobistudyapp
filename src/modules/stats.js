
/**
 * Computes the mean of an array of numbers
 * @param {array} values array of numbers
 * @returns the mean
 */
export function mean (values) {
  return values.reduce(
    (previousValue, currentValue) => previousValue + currentValue / values.length,
    0)
}

/**
 * Computes the variance of an array of numbers
 * @param {array} values: array of numbers
 * @param {boolean} sample: if true computes sample varaicne instead of population
 * @returns variance
 */
export function variance (values, sample = true) {
  let m = mean(values)
  let n = sample ? values.length - 1 : values.length
  return values.reduce(
    (previousValue, currentValue) => previousValue + (currentValue - m) ** 2 / n,
    0)
}

/**
 * Used to compute statistics on a rolling basis.
 * Based on the Welford algorithm, see https://www.johndcook.com/blog/standard_deviation/
 */
export class RollingStats {
  constructor () {
    this.reset()
  }

  /**
   * Adds a value to the statistics
   * @param {number} x: number
   */
  addValue (x) {
    this.m_n++

    if (this.m_n === 1) {
      this.m_oldM = this.m_newM = x
      this.m_oldS = 0.0
    } else {
      this.m_newM = this.m_oldM + (x - this.m_oldM) / this.m_n
      this.m_newS = this.m_oldS + (x - this.m_oldM) * (x - this.m_newM)

      // set up for next iteration
      this.m_oldM = this.m_newM
      this.m_oldS = this.m_newS
    }
  }

  /**
   * Gets the number of samples added
   * @returns total number of samples
   */
  getCount () {
    return this.m_n
  }

  /**
   * Computes the mean of the samples
   * @returns the mean
   */
  getMean () {
    if (this.count < 1) return undefined
    return this.m_newM
  }

  /**
   * Computes the variance of the samples
   * @param {boolean} sample: if true computes the sample variance, else the population one
   * @returns
   */
  getVariance (sample = true) {
    if (this.count < 2) return undefined
    let n = sample ? this.m_n - 1 : this.m_n

    return this.m_newS / n
  }

  /**
   * Resets statistics
   */
  reset () {
    this.m_n = 0
    this.m_oldM = 0
    this.m_newM = 0
    this.m_oldS = 0
    this.m_newS = 0
  }
}

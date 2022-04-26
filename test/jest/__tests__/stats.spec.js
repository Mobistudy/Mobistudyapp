import { mean, RollingStats, variance } from '../../../src/modules/stats.js'

describe('When testing stats', () => {
  test('mean is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    let m = mean(arr)
    expect(m).not.toBeUndefined()
    expect(m).toBe(5)
  })

  test('variance is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    let v = variance(arr)
    expect(v).not.toBeUndefined()
    expect(v).toBe(7.5)
  })

  test('sample variance is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    let v = variance(arr, false)
    expect(v).not.toBeUndefined()
    expect(v).toBeCloseTo(6.666667, 5)
  })
})

describe('When testing rolling stats', () => {
  let estimator = new RollingStats()

  beforeEach(() => {
    estimator.reset()
  })

  test('mean is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    arr.forEach(element => {
      estimator.addValue(element)
    })

    let m = estimator.getMean()
    expect(m).not.toBeUndefined()
    expect(m).toBe(5)
  })

  test('population variance is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    arr.forEach(element => {
      estimator.addValue(element)
    })

    let v = estimator.getVariance()
    expect(v).not.toBeUndefined()
    expect(v).toBe(7.5)
  })

  test('sample variance is correct', () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    arr.forEach(element => {
      estimator.addValue(element)
    })

    let v = estimator.getVariance(false)
    expect(v).not.toBeUndefined()
    expect(v).toBeCloseTo(6.666667, 5)
  })
})

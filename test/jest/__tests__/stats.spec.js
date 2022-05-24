import { mean, RollingStats, WindowedRollingStats, variance } from '../../../src/modules/stats.js'

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

describe('When testing windowed rolling stats', () => {
  let estimator = new WindowedRollingStats(5)

  beforeEach(() => {
    estimator.reset()
  })

  test('mean is correct', () => {
    estimator.addValue(1)
    let m = estimator.getMean()
    expect(m).toBe(1)

    estimator.addValue(2)
    m = estimator.getMean()
    expect(m).toBe(1.5)

    estimator.addValue(3)
    m = estimator.getMean()
    expect(m).toBe(2)

    estimator.addValue(4)
    m = estimator.getMean()
    expect(m).toBe(2.5)

    estimator.addValue(5)
    m = estimator.getMean()
    expect(m).toBe(3)

    estimator.addValue(6)
    m = estimator.getMean()
    expect(m).toBe(4)

    estimator.addValue(7)
    m = estimator.getMean()
    expect(m).toBe(5)

    estimator.addValue(8)
    m = estimator.getMean()
    expect(m).toBe(6)

    estimator.addValue(9)
    m = estimator.getMean()
    expect(m).toBe(7)

    estimator.addValue(10)
    m = estimator.getMean()
    expect(m).toBe(8)

    estimator.addValue(11)
    m = estimator.getMean()
    expect(m).toBe(9)

    estimator.addValue(12)
    m = estimator.getMean()
    expect(m).toBe(10)

    estimator.addValue(13)
    m = estimator.getMean()
    expect(m).toBe(11)

    estimator.addValue(14)
    m = estimator.getMean()
    expect(m).toBe(12)

    estimator.addValue(15)
    m = estimator.getMean()
    expect(m).toBe(13)
  })

  test('population variance is correct', () => {
    estimator.addValue(1)
    let v = estimator.getVariance(false)
    expect(v).toBeUndefined()

    estimator.addValue(9)
    v = estimator.getVariance(false)
    expect(v).toBe(16, 2)

    estimator.addValue(2)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(12.7, 1)

    estimator.addValue(8)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(12.5, 1)

    estimator.addValue(3)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(10.6, 1)

    estimator.addValue(7)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(7.8, 1)

    estimator.addValue(4)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(5.4, 1)

    estimator.addValue(6)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(3.4, 1)

    estimator.addValue(5)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(2, 1)

    estimator.addValue(0)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(5.8, 1)

    estimator.addValue(9)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(8.6, 1)

    estimator.addValue(8)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(9.8, 1)

    estimator.addValue(7)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(10.2, 1)

    estimator.addValue(6)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(10.0, 1)

    estimator.addValue(5)
    v = estimator.getVariance(false)
    expect(v).toBeCloseTo(2, 1)
  })
})

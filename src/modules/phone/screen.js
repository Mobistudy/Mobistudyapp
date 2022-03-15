let screen = {
  async forbidSleep () {
    return new Promise((resolve, reject) => {
      window.plugins.insomnia.keepAwake(resolve, reject)
    })
  },
  async allowSleep () {
    return new Promise((resolve, reject) => {
      window.plugins.insomnia.allowSleepAgain(resolve, reject)
    })
  }
}

let screenMock = {
  async forbidSleep () {
    return Promise.resolve()
  },
  async allowSleep () {
    return Promise.resolve()
  }
}

export { screen, screenMock }

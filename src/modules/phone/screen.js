let screen = {
  async forbidSleep () {
    // could switch to https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API when supported on iOS
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

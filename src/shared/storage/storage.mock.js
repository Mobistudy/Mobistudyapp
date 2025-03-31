// use these flags for testing:
const FAIL_INIT = false
const DB_CORRUPTED = false

let memStorage = {}

export async function init () {
  if (FAIL_INIT) return Promise.reject()
  return Promise.resolve()
}

export async function getItem (key) {
  if (DB_CORRUPTED) {
    const event = new Event('dbcorrupted')
    document.dispatchEvent(event)
    return Promise.reject()
  }
  if (key === 'peakflow') {
    const mockPEFs = []
    for (let i = 0; i < 21; i++) {
      mockPEFs.push({
        pefMax: 400 + Math.random() * 100,
        createdTS: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * i)
      })
    }
    return Promise.resolve(mockPEFs)
  } else if (key === 'miband3') {
    return Promise.resolve({
      id: '00:11:22:33:FF:EE',
      rssi: 200,
      authenticated: true
    })
  } else if (key === 'session') {
    const user = {
      name: 'Jameson',
      surname: 'Lee',
      dob: '1970-11-10',
      weight: 67,
      height: 172,
      sex: 'male',
      language: 'sv'
    }
    return Promise.resolve(user)
  }
  if (memStorage[key]) return Promise.resolve(JSON.parse(memStorage[key]))
  else return Promise.resolve()
}

export async function setItem (key, value) {
  memStorage[key] = JSON.stringify(value)
  return Promise.resolve()
}

export async function removeItem (key) {
  delete memStorage[key]
  return Promise.resolve()
}

export async function clear () {
  memStorage = {}
  return Promise.resolve()
}

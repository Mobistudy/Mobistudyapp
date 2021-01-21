// Could be implemented more simply but i wanted to try an iterator.

class CustomDate {
  constructor (date) {
    this.date = date
    this.dateFunctions = [
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
      this.date.getDay(),
      this.makeMilliseconds()
    ]
  }

  makeMilliseconds () { // Needs a better way. How to represent milliseconds in 6 bytes as fractions?
    return '000000'
  }

  getDateByteArrayPO60 () {
    const dateByteArray = []
    let count = 0
    for (let dateItem of this) {
      if (count === 0) {
        console.log('Retrieved date year:', dateItem)
        dateByteArray.push(dateItem - 2000) // If year is 2020, then one byte would contain the number 2020 - 2000 = 20
        count++
      } else {
        dateByteArray.push(dateItem)
      }
    }
    return dateByteArray
  }

  getDateStringPacket () {
    let dateStringPacket = ''
    for (let dateItem of this) {
      dateStringPacket += this.dateTimeToHex(dateItem)
    }
    return dateStringPacket
  }

  dateTimeToHex (value) {
    let hexValue = value.toString(16)
    if (hexValue.length % 2 !== 0) {
      hexValue = '0' + hexValue
    }
    if (hexValue.length === 4) {
      // year
      hexValue = hexValue.substring(2, 4) + hexValue.substring(0, 2)
    }
    return hexValue
  }
}

class CustomDateIterator {
  constructor (customDate) {
    this.customDate = customDate
    this.dateFunctions = customDate.dateFunctions
    this.startIndex = 0
    this.currentIndex = 0
  }

  next () {
    let length = this.dateFunctions.length
    if (this.currentIndex < length) {
      return {
        value: this.dateFunctions[this.currentIndex++],
        done: false
      }
    }
    this.currentIndex = this.startIndex
    return { done: true }
  }
}

CustomDate.prototype[Symbol.iterator] = function () {
  return new CustomDateIterator(this)
}

export default CustomDate

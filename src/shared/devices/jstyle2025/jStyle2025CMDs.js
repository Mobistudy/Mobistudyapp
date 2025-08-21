export default {
  getDeviceVersion: 0x27,
  getBatteryLevel: 0x13,
  getTime: 0x41,
  setTime: 0x01,
  getUserProfile: 0x42,
  setUserProfile: 0x02,
  clearData: 0x61,
  getDailyActivitySummaryHistory: 0x51,
  getDetailedActivityHistory: 0x52,
  getDetailedHRHistory: 0x54, // seems not to work always?
  getHRHistory: 0x55,
  getName: 0x3e,
  getMACAddress: 0x22,
  setAutoMode: 0x2a,
  getAutoMode: 0x2b,
  getHRVHistory: 0x56,
  getTemperatureHistory: 0x65, // 0x62, seems not to work
  getSPO2History: 0x66,
  getSleeepHistory: 0x53
}

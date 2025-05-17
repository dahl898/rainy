function createForecastDateTimeList(weatherTimestemps) {
  const dateTimeSetList = []
  for (let i = 1; i < 6; i++) {
    // 5 is a tommorow.io's free plan forecast day limitation
    const currentDate = new Date(Date.now())
    currentDate.setUTCDate(currentDate.getUTCDate() + i)

    const dateTimeList = []
    for (let j = 0; j < weatherTimestemps.length; j++) {
      const currentDateClone = new Date(currentDate)
      currentDateClone.setUTCHours(weatherTimestemps[j], 0, 0)

      dateTimeList.push(currentDateClone.toISOString().slice(0, -5) + 'Z')
    }
    dateTimeSetList.push(dateTimeList)
  }

  return dateTimeSetList
}

function filterApiData(dataArray, timestamps) {
  const flattenedTimestampsArray = timestamps.flat()
  console.log('Data array: ' + dataArray + 'Timestamps ' + timestamps)
  const filteredArray = dataArray.filter((val) =>
    flattenedTimestampsArray.includes(val.startTime)
  )
  console.log(filteredArray)
  return filteredArray
}

export { createForecastDateTimeList, filterApiData }

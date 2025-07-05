function createForecastDateTimeList(weatherTimestemps) {
  const dateTimeSetList = []
  for (let i = 1; i < 5; i++) {
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

  const filteredArray = dataArray.filter((val) =>
    flattenedTimestampsArray.includes(val.startTime)
  )

  return filteredArray
}

function prepareDailyData(dailyDataArray, timestamps) {
  const flattenedTimestampsArray = timestamps.flat()
  const reducedTimestampsToDates = flattenedTimestampsArray.reduce(
    (acc, curr) => {
      const date = curr.split('T')[0]
      if (!acc.includes(date)) acc.push(date)
      return acc
    },
    []
  )
  const filteredDailyDataArray = dailyDataArray.filter((val) => {
    return reducedTimestampsToDates.includes(val.startTime.split('T')[0])
  })

  return filteredDailyDataArray
}

function composeFinalArrayForFrontend(
  filteredApiHourlyDataArray,
  filteredDailyDataArray,
  timestamps
) {
  const composedArray = timestamps.map(([timestamp]) => {
    //timestamp here represents an array of four strings ['2025-05-19T06:00:00Z','2025-05-19T12:00:00Z','2025-05-19T18:00:00Z''2025-05-19T00:00:00Z']. We only need to fetch the date from it, this is why I'm using [timestamp] (returns first element of an array), I'm just grabbing a first element of this array, because I know that the whole array is for one date but different time. So timestamp now equals '2025-05-19T06:00:00Z' in this case
    let currentDate = timestamp.split('T')[0]
    //innerArray is an array of API intervals objects with the same date: [{starttime: 28-05-2025T..., values: ...}, {starttime: 28-05-2025T..., values: ...}, {starttime: 28-05-2025T..., values: ...}]
    const innerArray = filteredApiHourlyDataArray.filter((APIDataElement) => {
      return APIDataElement.startTime.split('T')[0] === currentDate
    })
    innerArray.push(innerArray.shift()) //This is needed because on the frontend I would just map through to render the data, and it is essential that 6:00AM object goes first and 12:00PM object goes last.

    //Find and return an object from 'daily' API for this date. Daily API returns like an overview of parameters for this day. This is needed because some weather cards on frontend represent the whole day weather, not hour by hour forecast
    const dailyData = filteredDailyDataArray.find(
      (el) => el.startTime.split('T')[0] === currentDate
    )
    return {
      date: currentDate,
      hourly: innerArray,
      daily: dailyData,
    }
  })
  return composedArray
}

export {
  createForecastDateTimeList,
  filterApiData,
  composeFinalArrayForFrontend,
  prepareDailyData,
}

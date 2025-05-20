import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import queryString from 'query-string'
import {
  createForecastDateTimeList,
  filterApiData,
  composeFinalArrayForFrontend,
  prepareDailyData,
} from './Utils/functions.js'

dotenv.config()
const app = express()
const port = 3000

app.use(cors())

app.get('/weather/:city', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'accept-encoding': 'deflate, gzip, br',
      },
    }

    const location = req.params.city
    const apikey = process.env.WEATHERAPI
    const timesteps = ['current', '1d', '1h']
    const fields = [
      'precipitationIntensity',
      'precipitationType',
      'windSpeed',
      'windGust',
      'windDirection',
      'temperature',
      'temperatureApparent',
      'cloudCover',
      'cloudBase',
      'cloudCeiling',
      'weatherCode',
      'pressureSurfaceLevel',
      'precipitationProbability',
      'precipitationType',
      'rainIntensity',
      'snowIntensity',
      'freezingRainIntensity',
    ]

    const parametersURL = queryString.stringify(
      {
        apikey,
        location,
        timesteps,
        fields,
      },
      { arrayFormat: 'comma' }
    )

    const weatherTimestemps = [6, 12, 18, 0]
    const timestamps = createForecastDateTimeList(weatherTimestemps)
    const response = await fetch(
      'https://api.tomorrow.io/v4/timelines?' + parametersURL,
      options
    )
    const data = await response.json()
    const filteredHourlyData = filterApiData(
      data.data.timelines[1].intervals,
      timestamps
    )
    const dailyData = prepareDailyData(
      data.data.timelines[0].intervals,
      timestamps
    )
    const finalArrayForFrontend = composeFinalArrayForFrontend(
      filteredHourlyData,
      dailyData,
      timestamps
    )

    res.json({ finalArrayForFrontend, data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import queryString from 'query-string'

dotenv.config()
const app = express()
const port = 3000

app.use(cors())

app.get('/weather/:city', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'accept-encoding': 'deflate, gzip, br'}
    };

    const location = req.params.city
    const apikey = process.env.WEATHERAPI
    const timesteps = ["current", "1d", "1h"];
    const fields = [
      "precipitationIntensity",
"precipitationType",
"windSpeed",
"windGust",
"windDirection",
"temperature",
"temperatureApparent",
"cloudCover",
"cloudBase",
"cloudCeiling",
"weatherCode",
    ]

    const parametersURL = queryString.stringify({
      apikey,
      location,
      timesteps,
      fields

    }, {arrayFormat: "comma"})
    
    const response = await fetch('https://api.tomorrow.io/v4/timelines?' + parametersURL, options)
    const data = await response.json()
    console.log(data)
    res.json(data)
  }catch(err){
    console.error(err)
    res.status(500).json({error: 'Failed to fetch weather data'})
  }
  
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
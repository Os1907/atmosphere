import axios from "axios"

interface typeData {
  location: {
    name: string,
    country: string,
    localtime: string
  },
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string,
    }
    feelslike_c: number
  },
  forecast: {
    forecastday: [
      {
        date:number,
        day: {
          daily_chance_of_rain: string
          maxtemp_c: number,
          maxtemp_f: number,
          mintemp_c: number,
        },
        astro: {
          sunrise: string,
          sunset: string,
        },
        hour: [
          {
            date: string,
            time_epoch: number,
            temp_c: number,
            time: string,
            condition: {
              text: string,
              icon: string,
              code: number
            },

          }
        ]
      },
      
      {
        date:number,

        day: {
          daily_chance_of_rain: string
          maxtemp_c: number,
          maxtemp_f: number,
          mintemp_c: number,
        },
        astro: {
          sunrise: string,
          sunset: string,
        },
        hour: [
          {
            date: string,
            time_epoch: number,
            temp_c: number,
            time: string,
            condition: {
              text: string,
              icon: string,
              code: number
            },

          }
        ]
      }
      ,{
        date:number,
        day: {
          daily_chance_of_rain: string
          maxtemp_c: number,
          maxtemp_f: number,
          mintemp_c: number,
        },
        astro: {
          sunrise: string,
          sunset: string,
        },
        hour: [
          {
            date: string,
            time_epoch: number,
            temp_c: number,
            time: string,
            condition: {
              text: string,
              icon: string,
              code: number
            },

          }
        ]
      }
    ]
  }
}


export const weather = async (city: string) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${city}&days=7`).catch(() => console.log("can't find data "))
const data: typeData  = response?.data;
    return data;
}

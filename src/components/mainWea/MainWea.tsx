import sunny from '../../../public/Weather/005-sun.png'
import cloudy from '../../../public/Weather/cloudy.png'
import sunnytRain from '../../../public/Weather/rain2.png'
import mist from '../../../public/Weather/Mist.png'
import moon from '../../../public/Weather/moon.png'
import snow from '../../../public/Weather/Snow.png'
import foggySunny from '../../../public/Weather/Foggy.png'
import { useEffect, useState } from 'react'
import { CiTempHigh } from "react-icons/ci";
import { PiCloudRainThin } from "react-icons/pi";
import { LuClock7, LuSunset } from "react-icons/lu";
import { LuSunrise } from "react-icons/lu";
export interface ImainWeaProps {
  data?: {
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
}
const MainWea = ({ data }: ImainWeaProps) => {
  const [iconWeather, setIconWeather] = useState<string>()
  const [backGround, setBackGround] = useState<string>()
  console.log(data)
  useEffect(() => {
    const conditionToIconMap: { [key: string]: string } = {
      "Clear": moon,
      "Overcast": cloudy,
      "Cloudy": cloudy,
      "Partly cloudy": cloudy,
      "Sunny": sunny,
      "Mist": mist,
      "Patchy rain possible": sunnytRain,
      "Patchy rain nearby": sunnytRain,
      "Patchy light rain": sunnytRain,
      "Patchy light rain with thunder": sunnytRain,
      "Rain": sunnytRain,
      "Light drizzle": sunnytRain,
      "Light rain": sunnytRain,
      "Moderate rain at times": sunnytRain,
      "Heavy rain at times": sunnytRain,
      "Heavy rain": sunnytRain,
      "Freezing fog": snow,
      "Snow": snow,
      "Fog": foggySunny
    };
    const conditionText = data?.current?.condition?.text?.trim() || "";
    const icon = conditionToIconMap[conditionText];
    setIconWeather(icon);

    if (data?.current?.condition?.text === "Clear" && data?.location?.localtime?.slice(10, 12) < "6") {
      setBackGround(nightClear)
    } else if (data?.current?.condition?.text === "Overcast" || data?.current?.condition?.text === "Cloudy" || data?.current?.condition?.text === "Partly cloudy") {
      setBackGround(cloudyBg)
    } else if (data?.current?.condition?.text === "Sunny" && data?.location?.localtime?.slice(10, 12) <= "6") {
      setBackGround(sun)
    } else if (data?.current?.condition?.text === "Mist") {
      setBackGround(cloudyBg)
    } else if (data?.current?.condition?.text === "Patchy rain possible" || data?.current?.condition?.text === "Patchy light rain with thunder" || data?.current?.condition?.text === "Light drizzle" || data?.current?.condition?.text === "Rain" || data?.current?.condition?.text === "Light rain" || data?.current?.condition?.text === "Moderate rain at times" || data?.current?.condition?.text === "Heavy rain at times" || data?.current?.condition?.text === "Heavy rain" && data?.location?.localtime?.slice(10, 12) < "6") {
      setBackGround(rain)
    } else if (data?.current?.condition?.text === "Freezing fog" || data?.current?.condition?.text === "Snow") {
      setBackGround(snowBg)
    } else if (data?.current?.condition?.text === " fog") {
      setBackGround(foggySunny)
    }
  }, [data])

  const rain = "bg-gradient-to-b from-blue-300 via-gray-400 to-gray-600"
  const sun = "bg-gradient-to-tr from-yellow-200 to-orange-400"
  const nightClear = "bg-gradient-to-b from-indigo-800 to-blue-900"
  const cloudyBg = "bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500"
  const snowBg = "bg-gradient-to-b from-blue-100 to-blue-200"

  return <>
    <div className={`col-span-4  px-5 ${backGround}  bg -slate-900 rounded-2xl  flex flex-col lg:flex-row items-center`}>
      <div className="flex items-start flex-col ml-5 w-full  order-2 lg:order-1  ">
        <div className='flex w-full flex-col gap-x-1'>
          
          <div className='flex justify-center lg:justify-start w-full items-center lg:order-1 order-2 my-3 '>

        {
  data && data.location && data.location.name && data.location.name.length > 10 ? (
    <p className="text-white text-xl mt-3 font-semibold">
      {data.location.name}
    </p>
  ) : (
    <p className="text-white text-5xl mt-3 font-semibold">
      {data?.location.name}
    </p>
  )
}
          <p className="text-slate-200 text-sm mt-5 mx-1  font-semibold  ">
            {
              data?.location?.country

            }
          </p>
          </div>
            

        <div className='w-full order-1 lg:order-2'>
          
        <p className="text-white text-7xl lg:mb-5 lg:mt-2   text-center lg:text-start  font-semibold  ">
          {
            data?.current?.temp_c
          }&deg;
        </p>
        </div>
        </div>
        







        <div className={ `text-white bg-slate-800 w-full justify-center xl:justify-start  rounded-3xl px-3 py-1 text-sm mb-4 lg:mb-2 font-semibold flex gap-x-4  items-center ${backGround} lg:bg-gradient-to-r bg-gradient-to-b flex-wrap`}>

        <p>
        <CiTempHigh className='inline text-xl mb-1'/>  Feels like {
            data?.current?.feelslike_c
          }&deg;
        </p>
        <p>
        <PiCloudRainThin className='inline text-xl '/>  chance of rain {
            data?.forecast?.forecastday[0]?.day?.daily_chance_of_rain
          }% rain
        </p>
        
        <p>
        <LuClock7 className='inline mb-1 mx-1'/>
          {
            Number(data?.location?.localtime?.slice(10, 13)) > 12 ? ((Number(data?.location?.localtime?.slice(10, 13)) - 12) + ":" + data?.location?.localtime?.slice(11, 13)) : data?.location?.localtime?.slice(10, 16)
          }
          <span className='mx-1'></span>
          {
            Number(data?.location?.localtime?.slice(10, 13)) > 12 ? "PM" : "AM"
          }
   
        </p>

          <p>
          <LuSunrise className='inline mb-1 mx-1'/>
         { data?.forecast?.forecastday[0]?.astro?.sunrise}
          </p><p>
          <LuSunset className='inline mb-1 mx-1'/>
         { data?.forecast?.forecastday[0]?.astro?.sunset}
          </p>


        </div>





      </div>
      <div className=" flex w-full lg:w-1/2 items-center flex-col lg:mr-5 justify-between order-1   h-full  ">
        <img src={iconWeather} alt="" className='h-56 my-5 ' />
        <p className={`text-slate-200 text-sm mb-10   bg-slate-800 rounded-3xl px-3 font-semibold   ${backGround}`}>
          {
            data?.current?.condition?.text
          }
        </p>

      </div>
    </div>
    

  </>
}
export default MainWea

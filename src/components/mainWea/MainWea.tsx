import sunny from '../../../public/Weather/005-sun.png'
import cloudy from '../../../public/Weather/cloudy.png'
// import nightRain  from '../../../public/Weather/Lrain2.png'
import sunnytRain  from '../../../public/Weather/rain2.png'
// import wind  from '../../../public/Weather/006-wind.png'
import mist  from '../../../public/Weather/Mist.png'
import moon  from '../../../public/Weather/moon.png'
import snow  from '../../../public/Weather/Snow.png'
import foggySunny  from '../../../public/Weather/Foggy.png'
// import foggyNight  from '../../../public/Weather/foggy2.png'
import { useEffect, useState } from 'react'
import SwiperAstro from './Swiper/Swiper'
 export interface ImainWeaProps {
    data: {
      location: {
        name:string,
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
          day:{
            daily_chance_of_rain: string
          }
          hour:[
           {
             date: string ,
   time_epoch: number,
   temp_c: number,
           }
          ]
        }
        ]
      }
  }
}
  const MainWea = ({data}  : ImainWeaProps ) => {
   const [iconWeather, setIconWeather] = useState<string>()
   const [backGriund, setBackGriund] = useState<string>()
  useEffect(() => {
  const conditionToIconMap: { [key: string]: string } = {
    "Clear": moon,
    "Overcast": cloudy,
    "Cloudy": cloudy,
    "Partly cloudy": cloudy,
    "Sunny": sunny,
    "Mist": mist,
    "Patchy rain possible": sunnytRain,
    "Patchy rain nearby":sunnytRain,
    "Patchy light rain": sunnytRain,
    "Rain": sunnytRain,
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
  
  if (data?.current?.condition?.text=== "Clear" &&  data?.location?.localtime?.slice(10,12) < "6" ) {
    setBackGriund(nightClear)
} else if (data?.current?.condition?.text=== "Overcast" || data?.current?.condition?.text === "Cloudy" || data?.current?.condition?.text === "Partly cloudy"){
  setBackGriund(cloudyBg)
}else if (data?.current?.condition?.text=== "Sunny" &&  data?.location?.localtime?.slice(10,12) <= "6" ){
  setBackGriund(sun)
}else if (data?.current?.condition?.text=== "Mist"){
  setBackGriund(cloudyBg)
}else if (data?.current?.condition?.text=== "Patchy rain possible" || data?.current?.condition?.text === "Rain" || data?.current?.condition?.text === "Light rain" || data?.current?.condition?.text === "Moderate rain at times" || data?.current?.condition?.text === "Heavy rain at times" || data?.current?.condition?.text === "Heavy rain" &&  data?.location?.localtime?.slice(10,12) < "6" )  {
  setBackGriund(rain)
}else if (data?.current?.condition?.text=== "Freezing fog" || data?.current?.condition?.text === "Snow") {
  setBackGriund(snowBg)
}else if (data?.current?.condition?.text=== " fog") {
  setBackGriund(foggySunny)
}
}, [data])

  const rain ="bg-gradient-to-b from-blue-300 via-gray-400 to-gray-600"
  const sun ="bg-gradient-to-tr from-yellow-200 to-orange-400"
  const nightClear ="bg-gradient-to-b from-indigo-800 to-blue-900"
  const cloudyBg ="bg-gradient-to-tr from-gray-300 via-gray-400 to-gray-500"
  const snowBg = "bg-gradient-to-b from-blue-100 to-blue-200"

  return <>
    <div className={`col-span-4  mx-10 ${backGriund}  bg -slate-900 rounded-2xl flex items-center`}>
      <div className="flex items-start flex-col ml-5 w-full  ">


          <div className='flex  items-center gap-x-1'>
          
          
          <p className={ data?.location?.name.length > 6 ?  "text-white text-xl mt-3 font-semibold": "text-white text-5xl mt-3 font-semibold"  }>
            {
              data?.location?.name 
            } 
          </p>
          <p className="text-slate-200 text-sm mt-5    font-semibold  ">
            {
              data?.location?.country
    
            }
          </p>
    
            </div> 
        
        
      <p className="text-slate-500 text-sm  mt-2   font-semibold   ">
      Feels like {
          data?.current?.feelslike_c
        }&deg;
      </p>
      <p className="text-slate-500 text-sm     font-semibold   ">
      chance of rain {
          data?.forecast?.forecastday[0]?.day?.daily_chance_of_rain
        }% rain
      </p>
      <p className="text-white text-5xl mt-3 font-semibold  ">
      {
  Number(data?.location?.localtime?.slice(10,13)) > 12 ? (   (Number(data?.location?.localtime?.slice(10,13)) - 12 ) + ":"+ data?.location?.localtime?.slice(11,13) )  : data?.location?.localtime?.slice(10,15) 
}
                   {Number(data?.location?.localtime?.slice(10,13))  < 12 ? "AM" : "PM"  }
      </p>
      <p className="text-white text-7xl mb-5 mt-20    font-semibold  ">
        {
          data?.current?.temp_c
        }&deg;
      </p>
      </div>
      <div className=" flex w-1/2 items-center flex-col mr-5 justify-between   h-full  ">
        <img src={iconWeather} alt=""  className='h-56 my-5' />
      <p className="text-slate-200 text-sm mb-10   bg-slate-800 rounded-3xl px-3 font-semibold   ">
       {
         data?.current?.condition?.text
        }
      </p>

      </div>
    </div>
    <div className="col-span-4  mx-10  bg-slate-800  rounded-3xl">
          <p className="text-slate-200 ml-5 my-3 text-center">
            Today's Forecast
          </p>
        <SwiperAstro today={data?.forecast?.forecastday[0].hour}/>
    </div>
    
    
    </>
}
export default MainWea

import { useEffect, useState } from "react"
import { weather } from "./Apis/Data"
import MainWea from "./components/mainWea/MainWea"

  function  App() {
     interface typeData{
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
    const [countryName, setCountryName] = useState<string>("cairo")
    
    const [weatherData, setWeatherData] = useState<typeData>([]);
    

    useEffect(() => {
      const getData = async (countryName: string) => {
        try {
          const weatherInfo: typeData = await weather(countryName);
          if (weatherInfo) {
            setWeatherData(weatherInfo);
            console.log(weatherInfo);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      getData(countryName)
    } , [countryName])
 

  return (
    <>
    <section className=" min-h-screen  pt-14 bg-slate-900  ">

      <div className=" grid grid-cols-6 gap-y-5 py-5 min-h- container mx-24    ">
      <div className="col-span-4  mx-10   rounded-full">
      <input
  onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
    setCountryName((e.target as HTMLInputElement).value)
  }}
   type="text" placeholder="Type here" className="input  bg-slate-800 text-slate-300 font-medium  placeholder:text-slate-300 w-full rounded-full " />
    </div>
<MainWea data={weatherData}/>
      </div>
        <div>
        </div>
    </section>

    



    </>
  )
}

export default App

import { useEffect, useState } from "react"
import { weather } from "./Apis/Data"
import MainWea from "./components/mainWea/MainWea"
import SwiperAstro from "./components/mainWea/Swiper/Swiper"
import { PiCloudRainThin } from "react-icons/pi"
import {  LuSunrise, LuSunset } from "react-icons/lu"
import { HiMiniArrowSmallDown, HiMiniArrowSmallUp } from "react-icons/hi2";

function App() {
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
          date: number,
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
          date: number,

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
        , {
          date: number,
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
  const [countryName, setCountryName] = useState<string>("cairo")
  const [weatherData, setWeatherData] = useState<typeData | undefined>(undefined);



  useEffect(() => {
    const getData = async (countryName: string) => {
      try {
        const weatherInfo: typeData = await weather(countryName);
        if (weatherInfo !== undefined) {
          setWeatherData(weatherInfo);
          console.log(weatherInfo);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    getData(countryName)
  }, [countryName])

  return <>
    <section className=" min-h-screen  pt-14 background   ">


      <div className=" grid grid-cols-4  gap-y-5 py-5  lg:col-span-5 lg:mx-24 mx-4     ">
        <div className="col-span-4  px-5  rounded-full">
          <input
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              setCountryName((e.target as HTMLInputElement).value)
            }}
            type="text" placeholder="Search Locations" className="input  glass text-slate-300 font-medium  placeholder:text-slate-300 w-full rounded-full " />
        </div>
        {
          weatherData ? <MainWea data={weatherData} /> : <div className="mx-5 w-full flex my-10 justify-center col-span-4"><span className="loader  lg:mr-[7rem]"></span>
          </div>

        }


        {
          weatherData?.forecast?.forecastday.map((item, index) => (
            <div className=" bg- slate-900 glass rounded-3xl col-span-4 lg:px-5 px-2  shadow-2xl">




              {
                index == 0 ? <p className="text-slate-100 text-xl ml-5 my-3 font-semibold text-center">

                  Today's Forecast

                </p>
                  : <p className="text-slate-100 text-xl ml-5 my-3 font-semibold text-center">

                    <span className="mx-1  block lg:inline ">

                      Forecast for 
                    </span>
                    {item?.date}

                  </p>
              }
              <div className={ `text-white  rounded-3xl px-3 py-1 text-sm mb-2 font-semibold flex gap-x-4 justify-center items-center flex-wrap `}>

              <p>
<HiMiniArrowSmallUp className='inline text-xl mb-1 '/>  MaxTemp {
    item?.day?.maxtemp_c
  }&deg;
</p>
<p>
<HiMiniArrowSmallDown className='inline text-xl mb-1 '/>  MinTemp {
    item?.day?.mintemp_c
  }&deg;
</p>

<p>
<PiCloudRainThin className='inline text-xl '/>  chance of rain {
    item?.day?.daily_chance_of_rain
  }% rain
</p>

  <p>
  <LuSunrise className='inline mb-1 mx-1'/>
 { item?.astro?.sunrise}
  </p><p>
  <LuSunset className='inline mb-1 mx-1'/>
 { item?.astro?.sunset}
  </p>


</div>

              <SwiperAstro today={item.hour} />
            </div>
          ))
        }



      </div>
      <div>
      </div>
    </section>
  </>
}

export default App

import axios from "axios"


/*
// export const country = async (country: string) => {
//         const  {data} = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${country}&client_id=_cfBogLo-pVixzFFo9lUVNqlInbSc5hQruarkoagQ-4`).catch(() => console.log("can't find image "))
//         return data
// }
*/


export interface DataFace{
    data: {
        location: {
            name: string
        }
        current: {
            temp_c: number
            temp_f: number
            condition: {
                text: string
            }
        }
    }
}


export const weather = async (city: string) => {
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_APP_API_KEY}&q=${city}&days=7`).catch(() => console.log("can't find data "))
const data: DataFace | undefined = response?.data;
    return data;
}

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './../../../Swiper.css';
import { Autoplay } from 'swiper/modules';
interface Itoday{
    today:[
        {
    date: string ,
    time_epoch: number,
    temp_c: number,
        }
    ]
}
export default function SwiperAstro({today}:Itoday) {
    console.log(today)
  return (
    <>
    <div className=" h-32 rounded-3xl">
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
            delay: 1000,
          }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper rounded-3xl "
      >
        {
            today?.map((item , index)=>{
                return <><SwiperSlide key={item?.time_epoch} >
                    <div className='flex flex-col items-center bg-sky-700 py-4 px-3 rounded-full'>

                    <p className='text-white text-3xl'>

   { item?.temp_c} 
                    </p>
                    <p className='text-yellow-300'>
                        {index}
                    </p>
                    </div>
    </SwiperSlide>
                </>
            })
        }
      </Swiper>























    </div>
    
    
    </>
  )
}

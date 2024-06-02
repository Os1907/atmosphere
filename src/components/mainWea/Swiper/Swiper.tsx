import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './../../../Swiper.css';
import { Autoplay } from 'swiper/modules';

interface Itoday {
    today?: [
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
export default function SwiperAstro({ today }: Itoday) {
    return (
        <>
            <div className={`  rounded-3xl `}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    autoplay={{
                        delay: 1000,
                    }}
                    breakpoints={{
                        300: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                    navigation={true}
                    modules={[Autoplay]}
                    className="mySwiper rounded-3xl   "
                >
                    {
                        today?.map((item) => (
                            <SwiperSlide key={item?.time_epoch}>
                                
                              <div className={ "flex flex-col items-center py-4 h-40 md:h-44  rounded-3xl lg:w-2/3 w-full my-3 glass "}>
                                <p className="text-white text-[12px] lg:text-sm mt-3 font-semibold">
                                  {Number(item?.time?.slice(10, 13)) > 12
                                    ? `${Number(item?.time?.slice(10, 13)) - 12}:${item?.time?.slice(11, 13)}`
                                    : item?.time?.slice(10, 16)}
                                    <span className='lg:mx-1'></span>
                                  {Number(item?.time?.slice(10, 13)) < 12 ? "AM" : "PM"}
                                </p>
                                <p className="text-white text-xl font-semibold">
                                  {item?.temp_c}°
                                </p>
                                <img src={item?.condition?.icon} alt="weather Icon" className="size-10 lg:size-12" />
                                <p className="text-white text-[12px] lg:text-sm">
                                  {item?.condition?.text}
                                </p>
                              </div>
                            </SwiperSlide>
                          ))

                    }
                </Swiper>























            </div>


        </>
    )
}

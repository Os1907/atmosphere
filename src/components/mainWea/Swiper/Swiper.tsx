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
                            spaceBetween: 5,
                        },
                    }}
                    navigation={true}
                    modules={[Autoplay]}
                    className="mySwiper rounded-3xl "
                >
                    {
                        today?.map((item) => (
                            <SwiperSlide key={item?.time_epoch}>
                              <div className="flex flex-col items-center py-4 px-3 rounded-full">
                                <p className="text-white text-sm mt-3 font-semibold">
                                  {Number(item?.time?.slice(10, 13)) > 12
                                    ? `${Number(item?.time?.slice(10, 13)) - 12}:${item?.time?.slice(11, 13)}`
                                    : item?.time?.slice(10, 16)}
                                  {Number(item?.time?.slice(10, 13)) < 12 ? "AM" : "PM"}
                                </p>
                                <p className="text-white text-xl font-semibold">
                                  {item?.temp_c}°
                                </p>
                                <img src={item?.condition?.icon} alt="weather Icon" className="size-12" />
                                <p className="text-white text-sm">
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

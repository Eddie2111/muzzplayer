import { Image } from '@nextui-org/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Banner():JSX.Element {
    const ImageHeight = '800px';
    const ImageWidth = '1200px';
    return(
        <Swiper
            className="container h-[24rem] w-[36rem] mx-auto px-auto"
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 2000 }}
            pagination={{ clickable: true }}
            >
            <SwiperSlide className="h-[32rem] w-[36rem]">
                <Image
                src="https://mehtabdarblog.files.wordpress.com/2012/11/chris-brown-cover.jpg"
                width={ImageWidth}
                height={ImageHeight}
                />
            </SwiperSlide>
            <SwiperSlide className="h-[38rem] w-[36rem]">
                <Image
                src="https://m.media-amazon.com/images/I/71MvK4UWskL._UF1000,1000_QL80_.jpg"
                width={ImageWidth}
                height={ImageHeight}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                src="https://i.mdel.net/i/db/2013/12/218077/218077-800w.jpg"
                width={ImageWidth}
                height={ImageHeight}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                src="https://i0.wp.com/flexyokay.com/wp-content/uploads/2023/10/Trackhouse.jpg?fit=544%2C544&ssl=1"
                width={ImageWidth}
                height={ImageHeight}
                />
            </SwiperSlide>
        </Swiper>
    )
}
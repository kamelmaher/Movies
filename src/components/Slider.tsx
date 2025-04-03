import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useFetch } from '../hooks/useFetch';
import Loading from './Loading';
const Slider = () => {
    console.log("SLider Rendered")
    const { trending, isLoading, error } = useFetch("trending/movie/week")
    if (error)
        return <h3>{error}</h3>
    return (
        !isLoading ?
            <div style={{ userSelect: "none" }} className='mb-5 mt-3'>
                <h3 className='text-danger mb-3'>Trending Now</h3>
                <Swiper
                    modules={[Navigation]}
                    initialSlide={2}
                    spaceBetween={20}
                    breakpoints={
                        {
                            576: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            992: { slidesPerView: 3 },
                            1200: { slidesPerView: 4 }
                        }
                    }
                    centeredSlides={true}
                    loop={true}
                    navigation={true}
                    speed={1000}
                    effect='fade'
                    touchReleaseOnEdges={true}
                    freeMode={true}
                    className='swiper'
                >
                    {trending.map(movie =>
                        <SwiperSlide key={movie.id}>
                            {({ isActive }) => (
                                <div className='m-auto' style={{ height: "100%" }}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                        alt={movie.title}
                                        className='img-fluid'
                                        style={{ opacity: `${isActive ? "100%" : "50%"}`, transition: ".2s", minHeight: "200px" }}
                                        loading={`${isActive ? "eager" : "lazy"}`}
                                    />
                                    {
                                        isActive &&
                                        <h5 className='text-center mt-2'>{movie.title}</h5>
                                    }
                                </div>
                            )}
                        </SwiperSlide>
                    )}
                </Swiper >
            </div>
            : <Loading />
    )
}

export default Slider

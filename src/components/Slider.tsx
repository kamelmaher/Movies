import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from './Loading';
import { useNavigate } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { MovieType } from '../types/MovieType';
const Slider = () => {
    const trending = useFetch<MovieType[]>(`trending/movie/week`)
    const navigate = useNavigate()
    if (trending.isLoading) return <Loading />
    return (
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
                {trending.data.map(movie =>
                    <SwiperSlide key={movie.id} onClick={() => navigate(`movie/${movie.id}`)}>
                        {({ isActive }) => (
                            <div className='m-auto pointer' style={{ height: "100%" }}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                    className='img-fluid'
                                    style={{ opacity: `${isActive ? "100%" : "50%"}`, transition: ".1s", minHeight: "200px" }}
                                    loading="lazy"
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

    )
}

export default Slider

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie as MovieType } from "../Store/MovieSlice"
import { useNavigate } from 'react-router';
import { useAppSelector } from '../Store/Store';
type Swiper = {
    movies: MovieType[]
}
const Slider = ({ movies }: Swiper) => {
    const navigate = useNavigate()
    const content = useAppSelector(state => state.Link.content)
    return (
        <div style={{ userSelect: "none" }} className='d-none d-md-block mb-5'>
            <h3 className='text-danger mb-3'>Trending Now</h3>
            <Swiper
                modules={[Navigation]}
                initialSlide={2}
                spaceBetween={20}
                slidesPerView={4}
                centeredSlides={true}
                loop={true}
                navigation={true}
                speed={1000}
                effect='fade'
                touchReleaseOnEdges={true}
                freeMode= {true}
            >
                {
                    movies.map((e) => {
                        return <div key={e.id}>
                            <SwiperSlide key={e.id}>
                                {({ isActive }) => (
                                    <div style={{ position: "relative" }}>
                                        <img
                                            style={{ opacity: `${isActive ? "100%" : "50%"}` }}
                                            src={`https://image.tmdb.org/t/p/w300${e.poster_path}`} alt="" className='img-fluid'
                                            onClick={() => {
                                                navigate(`/movie/${e.id}`)
                                            }}
                                        />
                                        <div className={`movie-name text-center ${isActive ? "" : "d-none"}`}>
                                            <h4>{content == "tv" ? e.name : e.original_title}</h4>
                                        </div>
                                    </div>
                                )}
                            </SwiperSlide>
                        </div>

                    })
                }

            </Swiper>
        </div>
    )
}

export default Slider

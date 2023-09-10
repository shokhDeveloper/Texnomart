import "./Carousel.scss"
import swiperJson from "../../Settings/swiperTovar.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export const Carousel = ({ id }) => {
  const [swiper, setSwiper] = useState(null)
  const handleClick = (event) => {
    switch(event.target.id){
        case "prev":{
            swiper.slidePrev()
        }break;
        case "next":{
            swiper.slideNext()
        }break;
        default: return false
    }
  }
  return (
    <>
    {id === 1 && (
      <div className="swiper-title-box" style={{paddingLeft: "1rem"}}>
        <h3>Популярные категории</h3>
      </div>
    )}
      <Swiper className="swiper-utils"
        modules={[Navigation,  A11y]}
        spaceBetween={50}
        slidesPerView={id === 1 ? 6: 7}
        navigation
        pagination={{ clickable: true }}
        onSwiper={setSwiper}
        onSlideChange={() => console.log("slide change")}
  
      >
        
        <button onClick={(event) => handleClick(event)} id="prev" className="swiper-button-prev border-transparent"/>
        {swiperJson[id]?.cards?.map(item => {
            return(
              <>
              {id === 1 ? (
                <SwiperSlide className="swiper-slide-utils">
                  <div className="swiper-slide-items">
                  <img src={item.img} alt={item.title} />
                  <h5>{item.title}</h5>
                  </div>
                </SwiperSlide>
              ): (
                <SwiperSlide style={{backgroundImage: `url(${item?.img})`}} className="swiper-slide-utils"/>
              )}
              </>
            )
        })}
        <button id="next" onClick={handleClick} className="swiper-button-next border-transparent"/>
      </Swiper>
    </>);
};

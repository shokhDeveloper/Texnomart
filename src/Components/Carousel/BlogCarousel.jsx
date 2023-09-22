import "./Carousel.scss"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import tovars from "../../Settings/tovars.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ZFOLD  from "../../Settings/assets/images/ZFOLD.png"
import Iphone from "../../Settings/assets/images/Iphone.png"
import { useState } from "react";
import { Action, Button, removeItem } from "../../Settings";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

export const BlogCarousel = ({id}) => {
    const [swiper, setSwiper] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = (event) => {
        switch(event.target.id){
          case "continuation":{
            removeItem("loader")
            dispatch(Action.setLoader(true))
            dispatch(Action.setContinuations(true))
            navigate("/continuation")
          }break;
          case "next":{
            swiper.slideNext()
          }break;
          case "prev":{
            swiper.slidePrev()
          }
        }
    }
    console.log(tovars[4])
    return(
        <>
            <div className="swiper-title-box">
              <h4 style={{margin: "1rem 0rem"}}>Новости и блоги</h4>  
            </div>
            <div className="swiper-blog-button">
            <Button id="continuation" onClick={handleClick} type="yellow">Смотреть все</Button>
            </div>
            <Swiper
                className="swiper-blog continuations-blog"
                modules={[Navigation,  A11y]}
                spaceBetween={100}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={setSwiper}
                onSwiper={setSwiper}
            >    
              <button id="next" className="swiper-button-next border-transparent" onClick={handleClick}/>
              {tovars[id]?.cards?.slice(0,5)?.map((item, index) => {
                return(
                    <SwiperSlide  className="swiper-slide-blog continuation-item">
                    <div style={{background: `rgba(59,130,246,.${index === 0 ? 4 : (4+1)-index})` }} className="swiper-slide-blog-header continuation-item-header">
                    <a  href={item.url} target="blank">
                      <img src={item.orginalName === "Z-FOLD" ? ZFOLD: Iphone} style={{width: "100%"}} height={200} alt="" />
                    </a>
                    </div>
                    <div className="swiper-slide-blog-body continuation-item-body">
                    <p className="swiper-slide-date">
                        24 августа 2023
                    </p>
                    <h5>{item.name}</h5>
                    </div>
                  </SwiperSlide>
                )
              })}
              <button id="prev" className="swiper-button-prev border-transparent" onClick={handleClick}/>
            </Swiper>
        </>
    )
}
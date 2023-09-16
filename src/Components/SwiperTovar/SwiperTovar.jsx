
import "./swiper.scss";
import tovars from "../../Settings/tovars.json";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Like } from "../Like";
import { Button } from "../../Settings";
import Shop from "../../Settings/assets/images/shop.svg"
import { useState } from "react";
import { useCart } from "react-use-cart";
export const SwiperTovar = ({id}) => {
    const {addItem} = useCart()
    const [swiper, setSwiper] = useState(null)
    const handleShop = (item) => {
        addItem(item)
    }
    const handleClick = (event) => {
        switch(event.target.id){
            case "next":{
                swiper.slideNext()
            }break;
            case "prev":{
                swiper.slidePrev()
            }break;
            default: return false;
        }
    }
    return(
        <>
        <div className="swiper-title-box">
        {id === 0 ? (
            <h4>Новинка</h4>
        ): id === 1 ? (
            <h4>Хит продаж</h4>
        ): false}
        </div>
        <Swiper className="swiper-tovars-box"
        modules={[Navigation, Pagination,  A11y]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        onSwiper={setSwiper}
        onSlideChange={() => console.log('slide change')}
      >
        <button id="next" onClick={handleClick} className="swiper-button-next border-transparent"/>
        {tovars[id].cards?.map((item) => {
            return(
                <SwiperSlide className="swiper-tovar-box">
                    <div className="swiper-tovar-header">
                        <Like indexId={id} id={item.id}/>
                    </div>
                    <div className="swiper-tovar-body">
                        <img src={item.img} width={200} height={item.id === 1 ? 50: item.id === 4 ? 52: 70} alt="Texnomart" />
                        <h4>{item.name}</h4>    
                        <div className="swiper-tovar-kredit">
                            <p>382 075 so'mdan / 24 Oy</p>
                        </div>
                        <div className="swiper-tovar-price">
                            {item.notprice && (
                                <>
                                    <p> <del>{item.notprice} so'm</del></p>
                                </>
                            )}
                            <div className="swiper-shopping-box">
                            <p>{item.price} so'm</p>
                            <Button onClick={ () => handleShop(item)} type="light"  > <img src={Shop} alt="" /></Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })}
            <button id="prev" onClick={handleClick} className="swiper-button-prev border-transparent"/>
      </Swiper>
        </>
    )
}
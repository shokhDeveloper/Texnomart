import "./hero.scss"

import swiperCards from "../../Settings/swiper.json";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { HeaderAnimation } from "./HeroAnimation";
import { Carousel } from "../Carousel";
import { Modal, ModalLogin, ModalRegister } from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Action } from "../../Settings";
import { Shopping } from "../../Shopping/Shopping";
import { SwiperTovar } from "../SwiperTovar/SwiperTovar";
import { FirebaseForm } from "../Modal/FirebaseForm";
export const Hero = () => {
  const {sign_modal, shoppingModal, signModalFirebase, signModalForFirebaseLogin} = useSelector((state) => state.Reducer)
  const [swiper, setSwiper] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClick = (event) => {
    switch(event.target.id){
      case "prev":{
        swiper.slidePrev()
      }break;
      case "next":{
        swiper.slideNext()
      }break;
      default: return false; 
    }
  }
  const carousel_array = [...Array(2).keys()]
  useEffect(() => {
    console.log(signModalFirebase, signModalForFirebaseLogin)
  }, [signModalFirebase, signModalForFirebaseLogin])
  return (
    <div className="hero">
      <div className="container">
        <Swiper
           autoplay={{
            delay: 2000,
            disableOnInteraction: false
        }}
        loop={true}
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable:   true }}
          onSwiper={setSwiper}
        >
          <button id="prev" className="swiper-button-prev border-transparent" onClick={handleClick}></button>
          {swiperCards?.map((item, index) => {
            return( 
            <>
            <SwiperSlide key={index}>
                <a href={item.ur}>
                <img height={350} src={item.image} alt="Image texnomart" />
                </a>
            </SwiperSlide>;
            </>
            )
          })}
          <button id="next" className="swiper-button-next border-transparent" onClick={handleClick}></button>
        </Swiper>
      <HeaderAnimation/>
        {carousel_array?.map((_, index) => (
          <Carousel id={index}/>
        ))}
        <Modal type={"sign"} modal={sign_modal}>
          <div className="modal-header">
            <div className="modal-header-link">
              <NavLink to={"login"}>
               Вход
              </NavLink>
              <NavLink to={"register"}>
                Регистрация
              </NavLink>
            </div>
            <button className="border-transparent" onClick={() => {
              navigate("/")
              dispatch(Action.setModalSign(false))} }>&times;</button>
          </div>
            <div className="modal-body">
              <Routes>
                <Route index element={<ModalLogin/>}/>
                <Route path="login" element={<ModalLogin/>}/>  
                <Route path="register" element={<ModalRegister/>}/>
              </Routes>              
            </div>
        </Modal>
        <Modal type={"shoppingCart"} modal={shoppingModal}>
              <Shopping/>
        </Modal>
        <Modal modal={signModalFirebase} type={"sign"}>
        <div className="modal-header">
            <h2>Passwordigizni kiriting</h2>
            <button className="border-transparent" onClick={() => {
              navigate("/")
              dispatch(Action.setModalSignFirebase(false))} }>&times;</button>
          </div>
        <FirebaseForm type={"register"}/>
      </Modal>
      <Modal modal={signModalForFirebaseLogin} type={"sign"}>
        <div className="modal-header">
            <h2>Passwordigizni kiriting</h2>
            <button className="border-transparent" onClick={() => {
              navigate("/")
              dispatch(Action.signModalForFirebaseLogin(false))}}>&times;</button>
          </div>
        <FirebaseForm type={"login"}/>
      </Modal>
      <Modal/>
        <SwiperTovar id={0}/>
      
      </div>
    </div>
  );
};

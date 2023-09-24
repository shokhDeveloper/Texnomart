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
import { FirebaseFormLogin } from "../Modal/FirebaseFormLogin";
import { Podborki } from "../Podborki";
import { BlogCarousel } from "../Carousel/BlogCarousel";
import { Applications } from "../Applications";
import { Cards } from "../Cards";
import { Popular } from "../Popular";
import { Footer } from "../Footer";
export const Hero = () => {
  const {sign_modal, shoppingModal, signModalFirebase, signModalForFirebaseLogin, errorNetwork} = useSelector((state) => state.Reducer)
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
    <section className="hero">
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
        <FirebaseForm/>
      </Modal>
      <Modal modal={signModalForFirebaseLogin} type={"sign"}>
        <div className="modal-header">
            <h2>Passwordigizni kiriting</h2>
            <button className="border-transparent" onClick={() => {
              navigate("/")
              dispatch(Action.signModalForFirebaseLogin(false))}}>&times;</button>
          </div>
          <FirebaseFormLogin/>
      </Modal>
        <SwiperTovar id={0}/>
        <SwiperTovar id={1}/>
        <Podborki/>
        <BlogCarousel id={4}/>
        <Applications/>
        <Cards/>
        <Popular/>
      </div>
        <Footer/>
        <Modal modal={errorNetwork} type={"error"}>
            <svg data-v-f65c878e="" width="94" height="94" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline"><path data-v-f65c878e="" d="M52.6644 21.5643C52.3314 21.5643 52.0009 21.4296 51.7585 21.1628C45.4783 14.2533 37.1389 10.4484 28.2781 10.4484C19.4172 10.4484 11.0778 14.2533 4.79762 21.1628C4.34466 21.6671 3.5685 21.699 3.06903 21.246C2.5671 20.7906 2.53037 20.0169 2.98578 19.515C9.7361 12.0889 18.7169 8 28.2781 8C37.8392 8 46.82 12.0889 53.5703 19.5174C54.0257 20.0193 53.989 20.793 53.4871 21.2485C53.252 21.459 52.9582 21.5643 52.6644 21.5643Z" fill="#BABAC0"></path> <path data-v-f65c878e="" d="M46.3725 28.4884C46.0395 28.4884 45.7089 28.3538 45.4665 28.0869C40.8684 23.0284 34.762 20.2421 28.2786 20.2421C21.7951 20.2421 15.6887 23.0284 11.0906 28.0893C10.6352 28.5913 9.86147 28.628 9.36199 28.1726C8.86007 27.7172 8.82334 26.9435 9.27875 26.4416C14.347 20.864 21.0924 17.7937 28.2786 17.7937C35.4647 17.7937 42.2101 20.864 47.2784 26.4416C47.7338 26.9435 47.6971 27.7172 47.1951 28.1726C46.9601 28.3832 46.6663 28.4884 46.3725 28.4884Z" fill="#BABAC0"></path> <path data-v-f65c878e="" d="M16.4786 35.4166C16.1848 35.4166 15.891 35.3113 15.6559 35.0983C15.154 34.6429 15.1173 33.8692 15.5727 33.3672C22.4675 25.7771 33.2724 26.235 39.0409 31.4256C39.5453 31.8786 39.5869 32.6498 39.1339 33.1542C38.681 33.6586 37.9048 33.6978 37.4053 33.2448C32.5109 28.8425 23.2999 28.5022 17.3845 35.015C17.1421 35.2819 16.8091 35.4166 16.4786 35.4166Z" fill="#BABAC0"></path> <path data-v-f65c878e="" d="M28.2803 49.6233C24.9039 49.6233 22.1592 46.8761 22.1592 43.5022C22.1592 40.1282 24.9039 37.3811 28.2803 37.3811C31.6566 37.3811 34.4013 40.1282 34.4013 43.5022C34.4013 46.8761 31.6566 49.6233 28.2803 49.6233ZM28.2803 39.8295C26.2554 39.8295 24.6076 41.4773 24.6076 43.5022C24.6076 45.527 26.2554 47.1748 28.2803 47.1748C30.3051 47.1748 31.9529 45.527 31.9529 43.5022C31.9529 41.4773 30.3051 39.8295 28.2803 39.8295Z" fill="#BABAC0"></path> <path data-v-f65c878e="" d="M47.8677 54.5201C40.4441 54.5201 34.4014 48.4799 34.4014 41.0538C34.4014 33.6277 40.4441 27.5874 47.8677 27.5874C55.2914 27.5874 61.3341 33.6277 61.3341 41.0538C61.3341 48.4799 55.2914 54.5201 47.8677 54.5201ZM47.8677 30.0358C41.7932 30.0358 36.8498 34.9792 36.8498 41.0538C36.8498 47.1283 41.7932 52.0717 47.8677 52.0717C53.9423 52.0717 58.8857 47.1283 58.8857 41.0538C58.8857 34.9792 53.9423 30.0358 47.8677 30.0358Z" fill="#FBC100"></path> <path data-v-f65c878e="" d="M52.764 42.2769H42.9703C42.2945 42.2769 41.7461 41.7285 41.7461 41.0527C41.7461 40.3769 42.2945 39.8285 42.9703 39.8285H52.764C53.4398 39.8285 53.9882 40.3769 53.9882 41.0527C53.9882 41.7285 53.4398 42.2769 52.764 42.2769Z" fill="#333333"></path></svg> 
            <h4>Нет соединения</h4>
            <div className="modal-error-discription">
            <h5>Проверьте ваше интернет соединение и попробуйте снова</h5>
            </div>
        </Modal>
    </section>
  );
};

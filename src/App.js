import { RouterProvider } from "react-router";
import { Action, GlobalStyle, getItem, removeItem, route, setItem } from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "./Components";
import i18n from "i18next";
import {initReactI18next} from "react-i18next"
import { useCart } from "react-use-cart";
function App() {
  const {loader, token} = useSelector((state) => state.Reducer)
  const dispatch = useDispatch()
  
  const handleLoader = () => {
    if(getItem("loader") === null || loader ){
      setTimeout(() => {
        dispatch(Action.setLoader(false))
        setItem("loader", "loader-end")
      }, 1500)
    }
  }
  useEffect(() => {
    if(loader){
      handleLoader()
    }
  },[loader])
  
  const handleClick = (event) => {
    if(event.target.matches(".catalot_btn") || event.target.matches(".catalog-item") ){
      return false
    }else {
      dispatch(Action.setCatalog(false))
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  },[])
  const handleScroll = () => {
    if (window.scrollY > 500) {
      dispatch(Action.setTopDisplay(true));
    } else {
      dispatch(Action.setTopDisplay(false));
    }
    if(window.scrollY > (Math.round(214.39999389648438)-1)){
      dispatch(Action.setHeaderActive(true))
    }else{
      dispatch(Action.setHeaderActive(false))
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng:getItem("language") ? getItem("language") : "uz" ,
    resources: {
      uz: {
        translation: {
          navigation_item: "Бизнинг дўконларимиз"
        }
      },
      ru: {
        translation : {
          navigation_item: "Наши магазины"
        }
      }
    }
  });
  return(
    <>
    {loader ? (
      <Loader/>
    ):(
    <RouterProvider router={route} />
    ) }
    <GlobalStyle/>
    </>
  ) 
}

export default App;

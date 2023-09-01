import { RouterProvider } from "react-router";
import { Action, GlobalStyle, getItem, route, setItem } from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "./Components";
import i18n from "i18next";
import {initReactI18next} from "react-i18next"
function App() {
  const {loader} = useSelector((state) => state.Reducer)
  const dispatch = useDispatch()
  
  const handleLoader = () => {
    if(getItem("loader") === null && loader ){
      setTimeout(() => {
        dispatch(Action.setLoader(false))
        setItem("loader", "loader-end")
      }, 1500)
    }
  }
  useEffect(() => {
    if(loader === true){
      handleLoader()
    }
  },[loader])
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

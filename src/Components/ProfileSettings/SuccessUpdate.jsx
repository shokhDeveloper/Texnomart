import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "../../Settings";

export const SuccessUpdate = ({ text, modal, handleGetUser }) => {
  const {successUpdate, user} = useSelector((state) => state.Reducer)
  const dispatch = useDispatch()
  const textRef = useRef();
  let idx = 0;
  const handleTyping = () => {
    console.log(text.length > idx, modal)
      if(text?.length > idx && modal){
        textRef.current.innerHTML += text[idx]
        idx ++
        setTimeout(handleTyping, 50)
      }else{
        textRef.current.innerHTML += user.name
        idx = 0
        setTimeout(() => {
          textRef.current.innerHTML = null
          dispatch(Action.setSuccessUpdateProfileData(false))
          handleGetUser()  
        }, 1000)  
      }
   
  };
 useEffect(() => {
  if(text?.length && modal){
    handleTyping()
  }
 },[modal])
  return (
    <div className="text-typing" style={{ textAlign: "Center" }}>
      <h3 ref={textRef}></h3>
    </div>
  );
};

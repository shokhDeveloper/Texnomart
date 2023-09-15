import Google from "../../Settings/assets/images/Google.png";
import "./modal.scss";
import {
  Action,
  Button,
  GoogleBtn,
  getItem,
  removeItem,
  setItem,
} from "../../Settings";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import { LoginError } from "./LoginError";
import { signInWithPopup } from "firebase/auth";
import { GoogleProvider, auth } from "../../Settings/firebase/firebase.config";
export const ModalLogin = () => {
  const { firebaseLogin, user, token, loader, loginError, loginUser} = useSelector(
    (state) => state.Reducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  const { mutate } = useMutation((data) => {
    axios
      .post(process.env.REACT_APP_SERVER + "/login", data)
      .then((response) => {
        if (response?.status === 200 || response?.status === 201) {
          const { accessToken, user } = response.data;
          if (accessToken) {
            dispatch(Action.setToken(accessToken));
            dispatch(Action.setUser(user));
            dispatch(Action.setModalSign(false));
            removeItem("loader");
            dispatch(Action.setLoader(true));
          }
        }
      }).catch(error => {
        dispatch(Action.setUserLoginError(true))
        
      });
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email its invalid")
      .required("Email its required"),
    password: Yup.string()
      .min(3, "Min 3")
      .max(15, "Max 15")
      .required("Password its required"),
  });
  const {
    register,
    watch,
    formState: { isValid, errors },
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (event) => {
    mutate({ ...event, date: date.toLocaleString() });
  };
  const handleGoogle = () => {
    signInWithPopup(auth, GoogleProvider).then(response => {
      const {user} = response
      const loginUser = {
        email: user?.email,
        password: null
      }
     dispatch(Action.setLoginUser(loginUser)) 
    })
  }
  useEffect(() => {
    if(loginUser?.email){
      dispatch(Action.setModalSign(false));
      dispatch(Action.signModalForFirebaseLogin(true));
    }
  },[loginUser])
  
  watch();
  return (
    <>
    <div className="modal-form-box">
      <form className="modal-login-form" onSubmit={handleSubmit(onSubmit)}>
        {loginError && (
          <LoginError reset={reset}/>
        )}
        <div className="modal-input-box">
          <input
            {...register("email")}
            onFocus={() =>
              dispatch(
                Action.setFireBaseLogin({ ...firebaseLogin, email: true })
                )
              }
              onBlur={() =>
                dispatch(
                  Action.setFireBaseLogin({ ...firebaseLogin, email: false })
                  )
                }
            className={errors?.email ? "error-input" : "default-input"}
            type="email"
            name="email"
            id="email"
            />
          <label
            style={{ color: errors?.email ? "crimson" : "#e2ad00" }}
            className={
              watch()?.email?.length || firebaseLogin?.email
              ? "active-input"
              : ""
            }
            htmlFor="email"
          >
            {errors?.email ? errors?.email?.message : "Email"}
          </label>
        </div>
        <div className="modal-input-box">
          <input
            {...register("password")}
            onFocus={() =>
              dispatch(
                Action.setFireBaseLogin({ ...firebaseLogin, password: true })
                )
            }
            onBlur={() =>
              dispatch(
                Action.setFireBaseLogin({ ...firebaseLogin, password: false })
              )
            }
            className={errors?.password ? "error-input" : "default-input"}
            type="password"
            name="password"
            id="password"
            />
          <label
            style={{ color: errors?.password ? "crimson" : "#e2ad00" }}
            className={
              firebaseLogin?.passwod || watch()?.password ? "active-input" : ""
            }
            htmlFor="password"
            >
            {errors?.password ? errors?.password?.message : "Password"}
          </label>
        </div>
        <Button className="modal-button" type="submit">
          Submit
        </Button>
        <GoogleBtn
          onClick={handleGoogle}
          className="border-transparent btn-login"
          style={{ backgroundImage: `url(${Google})`, border: "1px solid #4f4c4c" }}
          type="button"
          >
          Google orqali login qiling
        </GoogleBtn>
      </form>
    </div>
    </>
  );
};

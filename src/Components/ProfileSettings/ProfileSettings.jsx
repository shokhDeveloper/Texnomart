import "./profileSettings.scss";
import { useDispatch, useSelector } from "react-redux";
import { useBack } from "../CustomHooks";
import { useCallback, useEffect, useState } from "react";
import { Action, Api, Button } from "../../Settings";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "../Modal";
import { SuccessUpdate } from "./SuccessUpdate";
import { Delete } from "./Delete";
export const ProfileSettings = () => {
  const [disabled, setDisabled] = useState(true)
  const date = new Date()
  const { user, userProfile, userProfileData,successUpdate, successText, token } = useSelector(
    (state) => state.Reducer
  );
  const dispatch = useDispatch();
  const { getProfile } = Api;
  const handleGetUser = useCallback(async () => {
    if (!userProfile?.length  ) {
      const request = await getProfile(user.id).catch((error) =>
      console.log(error)
      );
      const response = await request.data;
    
        dispatch(Action.setUserProfile(response));

    }
  }, [user.id]);
  useEffect(() => {
    handleGetUser();
  }, [handleGetUser]);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name its required !"),
    lastname: Yup.string().required("Lastname its required !"),
    email: Yup.string()
      .email("Email its invalid !")
      .required("Email its required !"),
    password: Yup.string()
      .min(3, "Min 3")
      .max(15, "Min 15")
      .required("Password its required !"),
  });
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    values: {
      name: userProfile?.name,
      lastname: userProfile?.lastname,
      email: userProfile?.email,
      password: "Password",
    },
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  watch();
  useEffect(() => {
    const user = [watch()]
    user?.map(item => {
      if(item.name !== userProfile?.name || item.lastname !== userProfile?.lastname || item.email !== userProfile?.email ){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
    } )
  },[watch()])
  const onSubmit = async (event) => {
      const request = await axios.put(process.env.REACT_APP_SERVER + `/users/${user.id}`, {...event, date: date.toLocaleString() }).catch(error => console.log(error))
      if(request?.status === 200){
        const response = await request.data
        dispatch(Action.setSuccessUpdateProfileData(true))
      }
  }
  useBack();
  return (
    <section className="user-profile">
      <div className="container">
        <div className="userprofile-title-box">
          <h2>Akkaunt ma'lumotlarni uzgartirish</h2>
        </div>
        <div className="userprofile-box">
          <div className="modal-form-box">
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              id="form-user"
              className="modal-user-form"
            >
              <div className="modal-input-box">
                <input
                  {...register("name")}
                  onFocus={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        name: true,
                      })
                    )
                  }
                  onBlur={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        name: false,
                      })
                    )
                  }
                  type="text"
                  id="name"
                  name="name"
                  className={errors?.name ? "error-input": "default-input"}
                />
                <label style={{color: errors?.name ? "crimson": "#FBC100"}}
                  className={
                    watch()?.name?.length || userProfileData?.name
                      ? "active-input"
                      : ""
                  }
                  htmlFor="name"
                >
                  name
                </label>
              </div>
              <div className="modal-input-box">
                <input
                  {...register("lastname")}
                  onFocus={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        lastname: true,
                      })
                    )
                  }
                  onBlur={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        lastname: false,
                      })
                    )
                  }
                  type="text"
                  id="lastname"
                  name="lastname"
                  className={errors?.lastname ? "error-input": "default-input"}
                />
                <label
                style={{color: errors?.lastname ? "crimson": "#FBC100"}}
                  className={
                    watch().lastname?.length || userProfileData?.lastname
                      ? "active-input"
                      : ""
                  }
                  htmlFor="name"
                >
                  Lastname
                </label>
              </div>
              <div className="modal-input-box">
                <input
                  {...register("email")}
                  onFocus={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        email: true,
                      })
                    )
                  }
                  onBlur={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        email: false,
                      })
                    )
                  }
                  type="email"
                  id="email"
                  name="email"
                  className={errors?.email ? "error-input" : "default-input"}
                />
                <label
                style={{color: errors?.email ? "crimson": "#FBC100"}}
                  className={
                    userProfileData?.email || watch().email
                      ? "active-input"
                      : ""
                  }
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="modal-input-box">
                <input
                  {...register("password")}
                  onFocus={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        password: true,
                      })
                    )
                  }
                  onBlur={() =>
                    dispatch(
                      Action.setUpdateProfileData({
                        ...userProfileData,
                        password: false,
                      })
                    )
                  }
                  type="password"
                  id="password"
                  name="password"
                  className={errors?.password ? "error-input": "default-input"}
                />
                <label
                style={{color: errors?.password ? "crimson": "#FBC100"}}
                  className={
                    watch().password || userProfileData?.password
                      ? "active-input"
                      : ""
                  }
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="user-btn-box">
                <Button disabled={disabled} type="yellow">{disabled ? "Ma'lumotlarni o'zgartiring": "Yuborish"}</Button>
              </div>
            </form>
          </div>
        </div>
      <Delete/>
      </div>
      <Modal modal={successUpdate} type={"sign"}>
        <div className="modal-header">
          <h3>Yangilash</h3>
          <button className="border-transparent" onClick={() => dispatch(Action.setSuccessUpdateProfileData(false))}>&times;</button>
        </div>
          <SuccessUpdate handleGetUser={handleGetUser} modal={successUpdate} text={successText}/>
      </Modal>
    </section>
  );
};

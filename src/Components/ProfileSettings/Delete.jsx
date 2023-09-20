import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export const Delete = () => {
    const {user} = useSelector((state) => state.Reducer)
    const navigate = useNavigate()
    const handleDeleteUser = () => {
        axios.delete(process.env.REACT_APP_SERVER + `/users/${user.id}`).then(response => {
            if(response.status === 200){
               navigate("/")
                window.localStorage.clear()
                window.location.reload()
            }
        })
    }
    const handleClick = (event) => {
        switch(event.target.id){
            case "watching-logout":{
                navigate("/")
                window.localStorage.clear()
                window.location.reload()
            }break;
            case "logout":{
                handleDeleteUser()
            }
        }
    }
    return(
        <div className="profile-settings-delete-elements">
        <button id="watching-logout" onClick={handleClick}>Vaqtincha chiqib ketish</button>
        <button id="logout" onClick={handleClick}>Profileni o'chirib chiqib ketish</button>
        </div>
    )
}
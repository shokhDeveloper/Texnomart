import axios from "axios"

export const Api = {
    getProfile(id){
        return(
            axios.get(process.env.REACT_APP_SERVER + `/users/${id}`)
        )
    }
}
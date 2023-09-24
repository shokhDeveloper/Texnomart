import axios from "axios"

export const Api = {
    getProfile(id){
        return(
            axios.get(process.env.REACT_APP_SERVER + `/users/${id}`)
        )
    },
    getContinuation(){
        return(
            axios.get(process.env.REACT_APP_SERVER + "/continuation")
        )
    },
    getPopular(){
        return(
            axios.get(process.env.REACT_APP_SERVER + "/popular")
        )
    }
}
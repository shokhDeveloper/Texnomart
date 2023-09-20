import "./likesTovar.scss"
import { useDispatch, useSelector } from "react-redux"
import { useBack } from "../CustomHooks"
import { Action } from "../../Settings"

export const LikesTovarPage = () => {
    const {tovarLocals} = useSelector((state) => state.Reducer)
    const dispatch = useDispatch()
    const handleDelete = (id) => {
        const filter = tovarLocals?.filter(item => item.id !== id)
        dispatch(Action.setNotLike(filter))
    }
    useBack()
    return(
        <section className="tovar-locals">
            <div className="container">
                <div className="tovarLocals-box">
                    <h2>Sevimli tovarlar</h2>
                </div>
                {tovarLocals?.length ? 
                    <ul className="tovarLocals-items" style={{justifyContent: tovarLocals?.length > 2 ? "space-between": "space-around"}}>
                        {tovarLocals?.map(item => {
                            console.log(item)
                            return(
                                <li className="tovar-item">
                                    <img className="tovar-image" width={200} height={200} src={item.img} alt="" />
                                    <h4 className="tovar-name">{item.name.split(" ").slice(0,1).join(" ")} ... </h4>
                                    <h5 className="tovar-price">Narx =  {item.price}</h5>   
                                    <button className="tovar-delete-button border-transparent" onClick={() => handleDelete(item.id)}>O'chirish</button>
                                </li>
                            )
                        })}
                    </ul>
                :
                (
                    <div className="tovarLocals-error-box">
                        <h3 className="error tovarLocals-error">Tovarlar mavjud emas</h3>
                    </div>
                )}
            </div>
        </section>
    )
}
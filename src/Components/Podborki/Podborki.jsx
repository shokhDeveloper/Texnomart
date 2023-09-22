import { useDispatch, useSelector } from "react-redux"
import { Action, SmallButton } from "../../Settings"
import { SwiperTovar } from "../SwiperTovar/SwiperTovar"

export const Podborki = () => {
    const {podborkiActiveLink} = useSelector(({Reducer}) => Reducer )
    const dispatch = useDispatch()
    return(
        <>
            <div className="swiper-title-box">
                <h4>Подборки</h4>
            </div>
            <div className="swiper-podbor-elements">
                <SmallButton style={{marginRight: "0.5rem"}} type="yellow" onClick={() => dispatch(Action.setPodborActiveLink("popular"))}>Mazza narx</SmallButton>
                <SmallButton type="light" onClick={() => dispatch(Action.setPodborActiveLink("recomindation"))}>Recomindation</SmallButton>
            </div>
            {podborkiActiveLink === "popular" ? (
                <SwiperTovar id={2}/>
            ): (
                <SwiperTovar id={3}/>
            )}
        </>       
    )
}
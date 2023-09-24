import "./cards.scss";
import { useSelector } from "react-redux"

export const Cards = () => {
    const {cards} = useSelector((state) => state.Reducer)
    return(
        <>  
        <section className="about-hero">
          <div className="hero-cards-title-box">
            <h2>Телефоны и бытовая техника в рассрочку</h2>
          </div>
           <ul className="hero-cards">
                {cards?.map((item, id) => {
                    return(
                        <li key={id} className="hero-card">
                            <img src={item.img} alt="Cashback" />
                            <h4>{item.title}</h4>
                            <h5>{item.text}</h5>
                        </li>
                    )
                })}
            </ul>
        </section>
        </>
    )
}
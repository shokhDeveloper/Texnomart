import "./application.scss"
export const Applications = () => {
    return(
        <div className="hero-application">
            <div className="hero-application-inner">
                <div className="hero-application-image">
                    <img src="https://texnomart.uz/_nuxt/img/phone-min.d3c6b0c.png" alt="Texnomart-Phone" />
                </div>
                <div className="hero-application-text">
                    <div className="hero-application-text-inner">
                    <h3>Скачивайте приложение</h3>
                    <h4>Совершайте покупки в мобильном приложении, не выходя из дома!</h4>
                    <div className="hero-application-text-elements">
                        <img src="https://texnomart.uz/_nuxt/img/app-qr-code-2x.6c90f4e.png" width={140} height={140} alt="QR-code" />
                        <div className="hero-application-discription-box">
                        <p>Наведите камеру и скачайте бесплатное приложение Texnomart</p>
                        </div>
                    </div>
                    <div className="hero-application-apps">
                        <a href="https://play-market.com">
                        <img src="https://texnomart.uz/_nuxt/img/googleplay-ru.638c81b.svg" alt="Play-market" />
                        </a>
                        <a href="https://app-store.com">
                        <img src="https://texnomart.uz/_nuxt/img/appstore-ru.9ebba86.svg" alt="App-store" />
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
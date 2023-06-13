import style from './style.module.css'
import { HomeIcon, CalendarIcon, ConfigIcon, LogoIcon, AccountIcon } from './icons'

export default function Sidebar({ setRoute, route }) {

    return (
        <div className={style.sidebar} id="sidebar">
            <div className={style.logo}>
                <div className={style.icon}>
                    <img src='/profile-img.png' className="rounded-full shadow-md" width={35}/>
                    <p className="text-gray-dark text-[10px]">Cronos</p>
                </div>
            </div>
            <div className={style.modules}>
                <div className={`${style.icon} ${route() == "home" ? "active" : ""} `} onClick={() => setRoute('home')}><HomeIcon /></div>
                <div className={`${style.icon} ${route() == "calendar" ? "active" : ""} `} onClick={() => setRoute('calendar')}><CalendarIcon /></div>
                <div className={`${style.icon} ${route() == "auth" ? "active" : ""} `} onClick={() => setRoute('auth')}><AccountIcon /></div>
            </div>
            <div className={style.config}>
                <div className={style.icon}><ConfigIcon /></div>
            </div>
        </div>
    )
}
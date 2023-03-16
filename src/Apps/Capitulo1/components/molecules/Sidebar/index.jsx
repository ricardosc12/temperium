import style from './style.module.css'
import { HomeIcon, CalendarIcon, ConfigIcon, LogoIcon, AccountIcon } from './icons'

export default function Sidebar({setRoute}){

    return (
        <div className={style.sidebar} id="sidebar">
            <div className={style.logo}>
                <div className={style.icon}><LogoIcon/></div>
            </div>
            <div className={style.modules}>
                <div className={style.icon} onClick={()=>setRoute('home')}><HomeIcon/></div>
                <div className={style.icon} onClick={()=>setRoute('calendar')}><CalendarIcon/></div>
                <div className={style.icon} onClick={()=>setRoute('auth')}><AccountIcon/></div>
            </div>
            <div className={style.config}>
                <div className={style.icon}><ConfigIcon/></div>
            </div>
        </div>
    )
}
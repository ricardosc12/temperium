import Atividades from "./components/Atividades"
import Main from "./components/Main"
import style from './style.module.css'

export default function HomePage(){
    return (
        <div className={style.home}>
            <Main/>
            <Atividades/>
        </div>
    )
}
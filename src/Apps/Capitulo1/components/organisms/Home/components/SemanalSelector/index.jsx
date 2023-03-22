import { For } from 'solid-js'
import style from './style.module.css'

export default function SemanalSelector({handleWeek, semanas}){

    return (
        <div className={style.main_selector_semanal}>
            <For each={semanas}>
                {(semana, index)=>(
                        <div onClick={()=>handleWeek(semana)} style={`z-index: ${20-index()};`}>
                            <p>{semana}</p>
                            <span>{index()+5}</span>
                        </div>
                    )}
            </For>
        </div>
    )
}
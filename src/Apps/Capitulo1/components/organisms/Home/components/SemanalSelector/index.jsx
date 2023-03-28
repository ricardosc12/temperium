import { createEffect, createMemo, For } from 'solid-js'
import style from './style.module.css'

export default function SemanalSelector({handleWeek, semanas, week, inside}){

    const total_atividades = createMemo(()=>{
        let atividade = {};
        for (const [semana, dias] of Object.entries(inside)){
            for (const [dia, intervalos] of Object.entries(dias)) {
                for (const [intervalo, atividades] of Object.entries(intervalos)) {
                        if(!atividade[semana]) atividade[semana] = Object.values(atividades).length
                        else atividade[semana] += Object.values(atividades).length
                }
                
            }
        }
        return atividade
    })

    return (
        <div className={style.main_selector_semanal}>
            <For each={semanas}>
                {(semana, index)=>(
                        <div onClick={()=>handleWeek(semana)} style={`z-index: ${20-index()};`} className={`${week()==semana?'bg-text-primary':''}`}>
                            <p className={`${week()==semana?'color-black-fundo':''}`}>{semana}</p>
                            <span>{total_atividades()?.[semana] || 0}</span>
                        </div>
                    )}
            </For>
        </div>
    )
}
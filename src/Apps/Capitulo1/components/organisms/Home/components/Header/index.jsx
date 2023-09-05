import style from './style.module.css'
import { AddIcon, ArrowIcon, ColumnIcon, GridIcon } from '@/Apps/Capitulo1/assets/Icons'
import { semanas, useStorage } from '../../../Storage/context'
import { createEffect, createMemo, For } from 'solid-js'

export default function HomeHeader(props) {

    const { dados, dispatch: { changeWeek } } = useStorage()

    function handleMode(e) {
        props.setMode(e.target.id)
    }

    function handleOpen() {
        document.getElementById('btn-open-atividades')?.click()
    }

    function handleOpenCreate() {
        document.getElementById('modal-create-atividade')?.click()
    }

    function handleWeek(next) {
        return () => {
            const current = parseInt(dados.week.replace('semana', ''))
            if (next) {
                if (current == semanas.length) return
                changeWeek('semana' + (current + 1))
            }
            else {
                if (current == 1) return
                changeWeek('semana' + (current - 1))
            }
        }
    }

    const total_atividades = createMemo(() => {
        let atividade = {};
        for (const [semana, dias] of Object.entries(dados.inside)) {
            for (const [dia, intervalos] of Object.entries(dias)) {
                for (const [intervalo, atividades] of Object.entries(intervalos)) {
                    if (!atividade[semana]) atividade[semana] = Object.values(atividades).length
                    else atividade[semana] += Object.values(atividades).length
                }

            }
        }
        return atividade
    })

    return (
        <div className={style.root_header}>
            <div className={style.root_header_main}>
                <div className="flex flex-col">
                    <div className={style.week_selector}>
                        <span onClick={handleWeek(false)}><ArrowIcon /></span>
                        <h3 className='color-black-fundo'>{dados.week.replace('semana', '')}º Semana</h3>
                        <span onClick={handleWeek(true)}><ArrowIcon /></span>
                    </div>
                    <div className={style.weeks}>
                        <For each={semanas}>
                            {(semana) => <span onClick={() => changeWeek(semana)} className={semana == dados.week ? 'active' : ''}>{total_atividades()[semana] || 0}</span>}
                        </For>
                    </div>
                </div>
                <span className={`${style.switch} ${props.mode() == "dashboard" ? style.dash : ""}`}>
                    <div onClick={handleMode} id="dashboard" className={style.item_mode}>
                        <GridIcon />
                        Grade
                    </div>
                    <div onClick={handleMode} id="todolist" className={style.item_mode}>
                        <ColumnIcon />
                        Board
                    </div>
                </span>
                <span className='flex space-x-4'>
                    <div onClick={handleOpenCreate} className='flex justify-center items-center bg-[var(--roxinho)] shadow-md px-3 rounded-md cursor-pointer'>
                        <AddIcon className="icon-svg color-main" />
                    </div>
                    <button onClick={handleOpen} className='btn-base bg-main'>
                        Atividades
                    </button>
                </span>
            </div>
        </div>
    )
}
import { IconClone } from "@/Apps/Capitulo1/assets/Icons";
import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { notify } from "@/Apps/Capitulo1/utils/notification/notification";
import style from './style.module.css'
import { useStorage } from "../../../Storage/context";
import { batch, createEffect, createSignal, onMount } from "solid-js";
import { dias, horarios, semanas } from "../../../Storage/context";

export default function ModalRecorrencia(props) {

    const { dados, dispatch: { addInside, removeInside } } = useStorage()

    const [inBoard, setInBoard] = createSignal({
        semanas: {},
        dias: {},
        horarios: {}
    })

    createEffect(() => {
        console.time('mount board')
        try {
            const state = {
                semanas: {},
                dias: {},
                horarios: {}
            }

            Object.entries(dados.hash[props.id]).forEach(([semana, dias]) => {
                if(Object.keys(dias).length==0) return
                Object.entries(dias).forEach(([dia, horarios]) => {
                    if(Object.keys(horarios).length==0) return
                    Object.keys(horarios).forEach(horario => {
                        state['horarios'][horario] = true
                        state['semanas'][semana] = true
                        state['dias'][dia] = true
                    })
                })
            })

            setInBoard(state)
        }
        catch {
            console.error("Erro ao obter informação de ativos.")
        }

        console.timeEnd('mount board')

    })

    function handleSave() {

        console.time('save board')

        const weeks = Array.from(document.getElementsByName("week-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        const days = Array.from(document.getElementsByName("day-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        const intervals = Array.from(document.getElementsByName("interval-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        const combinations = []

        intervals.forEach(interval => {
            days.forEach(day => {
                weeks.forEach(week => {
                    if (inBoard()['horarios'][interval]
                        && inBoard()['dias'][day]
                        && inBoard()['semanas'][week]) return
                    combinations.push([week, day, interval])
                })
            })
        })

        const toRemove = []
        const weekR = inBoard()['semanas']
        const dayR = inBoard()['dias']
        const intervalR = inBoard()['horarios']

        for (const semana in weekR) {
            if (!weeks.includes(semana)) {
                for (const day in dayR) {
                    for (const horario in intervalR) {
                        toRemove.push([semana, day, horario])
                    }
                }
            }
        }

        for (const day in dayR) {
            if (!days.includes(day)) {
                for (const semana in weekR) {
                    for (const horario in intervalR) {
                        toRemove.push([semana, day, horario])
                    }
                }
            }
        }

        for (const horario in intervalR) {
            if (!intervals.includes(horario)) {
                for (const day in dayR) {
                    for (const semana in weekR) {
                        toRemove.push([semana, day, horario])
                    }
                }
            }
        }

        batch(() => {
            combinations.forEach(drop => {
                addInside({
                    atividade: props.id,
                    drop: drop
                })
            })

            toRemove.forEach(drop => {
                removeInside({
                    atividade: props.id,
                    from: drop
                })
            })
        })

        console.timeEnd('save board')
    }

    function checkAll(e, name) {
        const checked = e.target.checked
        document.getElementsByName(name)?.forEach(el => {
            if (el.checked != checked) {
                el.click()
            }
        })
    }

    return (
        <div className={`modal ${style.modal}`}>
            <HeaderModal id={props.modalId} title={"Clonar atividade"} />
            <div className="px-2">
                <h4 className="color-text-secondary">
                    Crie de forma automatizada atividades para várias semanas, dias ou intervalos.
                </h4>
            </div>
            <div className="divisor"></div>
            <div className={style.content}>
                <div className="flex">
                    <h3 className="mr-3">{props.title}</h3>
                    <div className="flex space-x-2">
                        <For each={Array.isArray(props.tags) ? props.tags : []}>
                            {(tag) => {
                                return <div style={{ background: tag.color }} className="tag-sm">
                                    <p className="color-black-fundo font-medium">{tag.title}</p>
                                </div>
                            }}
                        </For>
                    </div>
                </div>
                <h4 className="mb-5 color-text-secondary">{props.description}</h4>
                <h3 className="mb-2">Clonar em:</h3>
                <div className="flex w-full mb-3 justify-between">
                    <h4 className="mr-5">Às semanas</h4>
                    <label className="flex">
                        <p className="mr-3">Selecionar todas</p>
                        <input onChange={e => checkAll(e, "week-check")} type="checkbox" placeholder="" />
                    </label>
                </div>
                <div className={style.check_item}>
                    <For each={semanas}>
                        {(week) => (
                            <label>
                                <input checked={inBoard()['semanas'][week]} name="week-check" id={week} type="checkbox" placeholder="" />
                                <p>{week}</p>
                            </label>
                        )}
                    </For>
                </div>
                <div className="flex w-full mt-2 mb-3 justify-between">
                    <h4 className="mr-5">Aos dias</h4>
                    <label className="flex">
                        <p className="mr-3">Selecionar todos</p>
                        <input onChange={e => checkAll(e, "day-check")} type="checkbox" placeholder="" />
                    </label>
                </div>
                <div className={style.check_item}>
                    <For each={dias}>
                        {(day) => (
                            <label>
                                <input checked={inBoard()['dias'][day]} name="day-check" id={day} type="checkbox" placeholder="" />
                                <p>{day}</p>
                            </label>
                        )}
                    </For>
                </div>
                <div className="flex w-full mt-2 mb-3 justify-between">
                    <h4 className="mr-5">Nos intervalos</h4>
                    <label className="flex">
                        <p className="mr-3">Selecionar todos</p>
                        <input onChange={e => checkAll(e, "interval-check")} type="checkbox" placeholder="" />
                    </label>
                </div>
                <div className={style.check_item}>
                    <For each={horarios}>
                        {(interval) => (
                            <label>
                                <input checked={inBoard()['horarios'][interval]} name="interval-check" id={interval} type="checkbox" placeholder="" />
                                <p>{interval}</p>
                            </label>
                        )}
                    </For>
                </div>
            </div>
            <div className="flex w-full justify-end mt-3 mb-2 pr-2">
                <button className="btn-sm white" onClick={handleSave}>
                    <IconClone className="icon-svg-sx color-black-fundo" />
                    <p className="font-medium">Salvar</p>
                </button>
            </div>
        </div>
    )
}
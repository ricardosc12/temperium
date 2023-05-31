import { IconClone } from "@/Apps/Capitulo1/assets/Icons";
import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { notify } from "@/Apps/Capitulo1/utils/notification/notification";
import style from './style.module.css'
import { useStorage } from "../../../Storage/context";
import { batch } from "solid-js";

export default function ModalRecorrencia(props) {

    const { dispatch: { addInside } } = useStorage()

    console.log(props)

    function handleSave() {
        const weeks = Array.from(document.getElementsByName("week-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        const days = Array.from(document.getElementsByName("day-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        const intervals = Array.from(document.getElementsByName("interval-check"))?.map(el => {
            if (el.checked) return el.id
        }).filter(item => item) || []

        if (!weeks.length || !days.length || !intervals.length) {
            notify("Selecione cada intervalo: Semana, Dia, Horário")
            return
        }

        const combinations = []

        intervals.forEach(interval => {
            days.forEach(day => {
                weeks.forEach(week => {
                    combinations.push([week, day, interval])
                })
            })
        })

        batch(() => {
            combinations.forEach(drop => {
                addInside({
                    atividade: props.id,
                    drop: drop
                })
            })
        })
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
        <div className="modal w-96">
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
                    <For each={props.semanas}>
                        {(week) => (
                            <label>
                                <input name="week-check" id={week} type="checkbox" placeholder="" />
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
                    <For each={props.dias}>
                        {(day) => (
                            <label>
                                <input name="day-check" id={day} type="checkbox" placeholder="" />
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
                    <For each={props.intervalos}>
                        {(interval) => (
                            <label>
                                <input name="interval-check" id={interval} type="checkbox" placeholder="" />
                                <p>{interval}</p>
                            </label>
                        )}
                    </For>
                </div>
            </div>
            <div className="flex w-full justify-end mt-3">
                <button className="btn-sm white" onClick={handleSave}>
                    <IconClone className="icon-svg-sx color-black-fundo" />
                    <p className="font-medium">Clonar</p>
                </button>
            </div>
        </div>
    )
}
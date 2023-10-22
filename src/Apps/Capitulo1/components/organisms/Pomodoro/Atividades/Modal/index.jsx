import { AddIcon, BackIcon, MinusIcon } from "@/Apps/Capitulo1/assets/Icons";
import { HeaderModal } from "@/Apps/Capitulo1/components/molecules/Modal";
import { createBackgroundColor, createDarkBackgroundColor } from "@/Apps/Capitulo1/utils/color";
import { createDebounce } from "@/Apps/Capitulo1/utils/debounce";
import { createEffect, createMemo, createSignal } from "solid-js";
import { useStorage } from "../../../Storage/context";
import { createFilter } from "./filter";
import style from './style.module.css'

export default function ModalActivities(props) {

    const { dados, dispatch: { addPomoActivitiesState, removePomoActivitiesState } } = useStorage()

    const [text, setText] = createSignal("")
    const setter = createDebounce(setText, 150)

    const atividades = createMemo(() => {
        let atividades_ = []
        for (let i = 0; i < dados.disciplinas.length; i++) {
            for (let j = 0; j < dados.disciplinas[i].atividades.length; j++) {
                atividades_.push({ ...dados.disciplinas[i].atividades[j], parentTitle: dados.disciplinas[i].title, statePomo: false });
            }
        }

        for (let i = 0; i < dados.tarefas.length; i++) {
            for (let j = 0; j < dados.tarefas[i].atividades.length; j++) {
                atividades_.push({ ...dados.tarefas[i].atividades[j], parentTitle: dados.tarefas[i].title, statePomo: false });
            }
        }
        return atividades_
    })

    const dataFiltered = createFilter(atividades, text)
    const pomoActivitiesMap = createMemo(() => new Set(dados.pomodoro.activitiesList.map(item => item.id)))

    function addToPomo(id) {
        if (pomoActivitiesMap().has(id)) return
        const atv = dataFiltered().find(item => item.id == id)
        addPomoActivitiesState(atv)
    }

    function remoteFromPomo(id) {
        removePomoActivitiesState(id)
    }

    return (
        <div className="modal w-[500px]">
            <HeaderModal id={props.modalId} title="Atividades"></HeaderModal>
            <div className="textfield flex-1 my-1 mx-2 mb-3">
                <input onInput={e => setter(e.target.value)} id="title" placeholder=" " type="text" autoComplete="off" />
                <p>Pesquisar</p>
            </div>
            <div className={style.list}>
                <For each={dataFiltered()}>
                    {(item) => {
                        return (
                            <div className={style.list_item}>
                                <div className="flex items-center">
                                    {!pomoActivitiesMap().has(item.id) ?
                                        <AddIcon onClick={() => addToPomo(item.id)} class="text-[var(--primary)] w-9" height="24" /> :
                                        <BackIcon onClick={() => remoteFromPomo(item.id)} class="text-[var(--primary)] w-9" height="18" />
                                    }
                                    <div className='flex items-center'>
                                        <h4 className="mr-1">{item.title}</h4>
                                        <h5>({item.parentTitle})</h5>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <For each={item.tags}>
                                        {(tag) => {
                                            const tagMap = props.tags()[tag.id]
                                            return tagMap ? <div
                                                style={{
                                                    background: tagMap.color,
                                                    color: createDarkBackgroundColor(tagMap.color, 0.4)
                                                }}
                                                className='tag px-1 py-1 font-semibold mr-1'>
                                                {tag.title}
                                            </div> : ''
                                        }}
                                    </For>
                                </div>
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}
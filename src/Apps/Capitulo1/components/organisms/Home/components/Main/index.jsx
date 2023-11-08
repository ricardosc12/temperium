import style from './style.module.css'

import SemanalSelector from '../SemanalSelector';
import { createEffect, createMemo, createSignal, For, Show, batch, onMount, onCleanup } from 'solid-js';
import { useStorage } from '../../../Storage/context';
import { Draggable as DraggableHook, Droppable as DroppableHook } from '@/Apps/Capitulo1/components/hooks/DragAndDrop';
import { createMenu } from '@/Apps/Capitulo1/components/hooks/Menu';
import { MenuAtividadeInside } from '@/Apps/Capitulo1/components/hooks/Menu/atividades_inside_menu';
import { createModal } from '@/Apps/Capitulo1/components/molecules/Modal';
import ModalRecorrencia from '../Modais/recorrency';
import { horarios, semanas, dias } from '../../../Storage/context';
import { BookIcon } from '@/Apps/Capitulo1/assets/Icons';
import ModalMoreInfo from '../Modais/moreInfo';

const Draggable = (props) => {

    const atividade = createMemo(() => props.atividades().get(props.id) || {})

    return (
        <DraggableHook id={atividade()?.parentId} data={props.id + '::' + props.drop}>
            <div className={style.card} onContextMenu={(e) => props.menu(e, props, atividade)} onClick={_ => props.openMoreInfo({ id: atividade().id })}>
                <div>
                    <h3>{atividade().title}</h3>
                    <span><BookIcon /></span>
                </div>
                <p>{atividade().description}</p>
                <span>
                    <For each={atividade()?.tags}>
                        {(tag) => <div className='tag-sm color-black-fundo' style={{
                            background: props.tags()[tag.id] ? props.tags()[tag.id].color : tag.color
                        }}
                        >{props.tags()[tag.id] ? props.tags()[tag.id].title : tag.title}
                        </div>}
                    </For>
                </span>

            </div>
        </DraggableHook>
    );
};

const Droppable = ({ id, ...props }) => {

    return (
        <DroppableHook data={id()}>
            {props.children}
        </DroppableHook>
    );
};

const DroppableArea = ({ id, title, dados, semana, dia, interval, tags, menu, openMoreInfo, ...props }) => {

    return (
        <Droppable id={id} className="w-full h-full p-2">
            <div className={style.area}>
                <For each={Object.values(dados.inside[semana]?.[dia]?.[interval] || {})}>
                    {(item) => {
                        return <Draggable menu={menu} tags={tags} atividades={props.atividades} openMoreInfo={openMoreInfo} {...item} />
                    }}
                </For>
            </div>
        </Droppable>
    )
}

function getHourIndex(hour) {
    if (hour <= 6) return 0
    else if (hour >= 23) return 17
    else return hour - 6
}

export default function Main(props) {

    const { dados, dispatch: { addInside, removeInside } } = useStorage()

    const [week, setWeek] = createSignal(semanas[0])

    let actualDay;
    let interval;

    function setActualDay() {
        const date = new Date()
        const query = date.getDay() + ":" + getHourIndex(date.getHours())
        if (actualDay) actualDay.classList.remove(style.actualDay)
        actualDay = document.querySelector(`td[id='${query}']`)
        actualDay.classList.add(style.actualDay)
    }

    onMount(() => {
        setActualDay()
        interval = setInterval(setActualDay, 1000);
    })

    onCleanup(() => {
        clearInterval(interval)
    })

    // function handleWeek(e) {
    //     console.time('switching')
    //     document.getElementById('loading-week').innerHTML = "Loading..."
    //     setTimeout(() => {
    //         setWeek(e)
    //         document.getElementById('loading-week').innerHTML = ""
    //         console.timeEnd('switching')
    //     })
    // }

    const id = (week, dia, interval) => {
        return () => `week:${week}dia:${dia}interval:${interval}`
    }

    const { open: openRecurrence } = createModal(ModalRecorrencia, {
        id: 'modal-recurrence',
        props: {
            modalId: 'modal-recurrence',
        }
    })

    const { open: openMoreInfo } = createModal(ModalMoreInfo, {
        id: 'modal-more-info',
        props: { modalId: 'modal-more-info', atividades: props.atividades, tags: props.tags }
    })

    async function menu(e, props, atividade) {
        e.stopPropagation()
        const menu_resp = await createMenu(e, MenuAtividadeInside)
        if (menu_resp == "repeat") {
            openRecurrence(atividade())
        }
        else if (menu_resp == "excluir") {
            removeInside({
                atividade: props.id,
                from: props.drop.split(/week:|dia:|interval:/).filter(Boolean)
            })
        }
    }

    // createEffect(() => {
    //     setTimeout(() => {
    //         batch(() => {
    //             semanas.forEach(semana => {
    //                 horarios.forEach(interval => {
    //                     dias.forEach(col => {
    //                         addInside({ atividade: "d84fc4d3-60b5-4ff8-b3c0-b87bcddbdf3f", drop: [semana, col, interval] })
    //                         addInside({ atividade: "9a6d0ee9-1b19-4215-8c3f-74aa0de58e83", drop: [semana, col, interval] })
    //                         addInside({ atividade: "eacf538e-01e0-4d96-8dc7-06e2924ffe9f", drop: [semana, col, interval] })
    //                         addInside({ atividade: "ef548917-57c4-4332-8e60-1f0a8734ec30", drop: [semana, col, interval] })
    //                         // addInside({ atividade: "351087fc-4b5b-4506-866d-0529c4d1286e", drop: [semana, col, interval] })
    //                     })
    //                 })
    //             })
    //         })
    //     }, 1000);
    // })

    return (
        <div className={style.main} id="main_content">

            {/* <SemanalSelector semanas={semanas} week={week} dados={dados} handleWeek={handleWeek} /> */}
            <h3 id="loading-week" className='color-black-fundo'></h3>
            <div className={`black-scroll ${style.table}`}>
                <For each={semanas}>
                    {(semana) => (
                        <Show when={semana == dados.week}>
                            <div className={`flex flex-row`}>
                                <table className={style.root_table}>
                                    <tbody>
                                        <tr>
                                            <For each={Array(dias.length + 1)}>
                                                {(_, index) => (
                                                    <td scope='col'>{`${index() != 0 ? dias[index() - 1] : ''}`}</td>
                                                )}
                                            </For>
                                        </tr>
                                        <For each={horarios}>
                                            {(interval, i) => (
                                                <tr>
                                                    <td scope="row"><p className='color-black-destaq text-xs text-center'>{interval}</p></td>
                                                    <For each={dias}>
                                                        {(dia, j) => (
                                                            <td
                                                                id={j() + ":" + i()}>
                                                                <DroppableArea openMoreInfo={openMoreInfo} menu={menu} tags={props.tags} id={id(semana, dia, interval)} dia={dia}
                                                                    semana={semana} interval={interval} dados={dados}
                                                                    atividades={props.atividades} />
                                                            </td>
                                                        )}
                                                    </For>
                                                </tr>
                                            )}
                                        </For>
                                    </tbody>
                                </table>
                            </div>
                        </Show>
                    )}
                </For>
            </div>

        </div>
    )
}

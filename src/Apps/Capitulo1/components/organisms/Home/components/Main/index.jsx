import style from './style.module.css'

import SemanalSelector from '../SemanalSelector';
import { createEffect, createMemo, createSignal, For, Show, batch } from 'solid-js';
import { useStorage } from '../../../Storage/context';
import { Draggable as DraggableHook, Droppable as DroppableHook } from '@/Apps/Capitulo1/components/hooks/DragAndDrop';
import { createMenu } from '@/Apps/Capitulo1/components/hooks/Menu';
import { MenuAtividadeInside } from '@/Apps/Capitulo1/components/hooks/Menu/atividades_inside_menu';
import { createModal } from '@/Apps/Capitulo1/components/molecules/Modal';
import ModalRecorrencia from '../Modais/recorrency';

const Draggable = (props) => {
    const atividade = createMemo(() => props.atividades().get(props.id))

    return (
        <DraggableHook id={atividade()?.parentId} data={props.id + '::' + props.drop}>
            <div className='w-fit flex py-1 cursor-pointer' onContextMenu={(e) => props.menu(e, props, atividade)}>
                <For each={atividade()?.tags}>
                    {(tag) => <div className='tag-sm color-black-fundo' style={{
                        background: props.tags()[tag.id] ? props.tags()[tag.id].color : tag.color
                    }}
                    >{props.tags()[tag.id] ? props.tags()[tag.id].title : tag.title}
                    </div>}
                </For>
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

const DroppableArea = ({ id, title, dados, semana, dia, interval, tags, menu, ...props }) => {

    return (
        <Droppable id={id} className="w-full h-full p-2">
            <div className={style.area}>
                <For each={Object.values(dados.inside[semana]?.[dia]?.[interval] || {})}>
                    {(item) => {
                        return <Draggable menu={menu} tags={tags} atividades={props.atividades} {...item} />
                    }}
                </For>
            </div>
        </Droppable>
    )
}

export default function Main(props) {

    const { dados, dispatch: { addInside, removeInside } } = useStorage()

    const semanas = [
        'semana1', 'semana2', 'semana3', 'semana4', 'semana5'
    ]

    const [week, setWeek] = createSignal(semanas[0])

    function handleWeek(e) {
        console.time('switching')
        document.getElementById('loading-week').innerHTML = "Loading..."
        setTimeout(() => {
            setWeek(e)
            document.getElementById('loading-week').innerHTML = ""
            console.timeEnd('switching')
        })
    }

    const id = (week, dia, interval) => {
        return () => `week:${week}dia:${dia}interval:${interval}`
    }

    const lines = [
        ',..', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:30', '19:20',
        '20:30', '21:20', '22:10', '..,'
    ];
    // '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18:30', '19:20', '20:30', '21:20'
    const col = [
        "dom", "seg", "ter", "qua", "qui", "sex", "sab"
    ];

    const { open: openRecurrence } = createModal(ModalRecorrencia, {
        id: 'modal-recurrence',
        props: {
            modalId: 'modal-recurrence',
            intervalos: lines,
            dias: col,
            semanas: semanas
        }
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
    //                 lines.forEach(interval => {
    //                     col.forEach(col => {
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

            <SemanalSelector semanas={semanas} week={week} dados={dados} handleWeek={handleWeek} />
            <h3 id="loading-week" className='color-black-fundo'></h3>
            <div className={`black-scroll ${style.table}`}>
                <For each={semanas}>
                    {(semana) => (
                        <Show when={semana == week()}>
                            <div className={`flex flex-row`}>
                                <table className={style.root_table}>
                                    <tbody>
                                        <tr>
                                            <For each={Array(col.length + 1)}>
                                                {(_, index) => (
                                                    <td>{`${index() != 0 ? col[index() - 1] : ''}`}</td>
                                                )}
                                            </For>
                                        </tr>
                                        <For each={lines}>
                                            {(interval) => (
                                                <tr>
                                                    <td><p className='color-black-destaq text-xs text-center'>{interval}</p></td>
                                                    <For each={col}>
                                                        {(dia) => (
                                                            <td>
                                                                <DroppableArea menu={menu} tags={props.tags} id={id(semana, dia, interval)} dia={dia}
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

const Teste = ({ week }) => {

    createEffect(() => {
        console.log(week())
    })

    return <div>{week()}</div>
}
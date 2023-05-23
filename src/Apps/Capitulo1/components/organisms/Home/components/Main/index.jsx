import style from './style.module.css'

import SemanalSelector from '../SemanalSelector';
import { createEffect, createMemo, createSignal, For, Show } from 'solid-js';
import { useStorage } from '../../../Storage/context';
import { Draggable as DraggableHook, Droppable as DroppableHook } from '@/Apps/Capitulo1/components/hooks/DragAndDrop';

const Draggable = (props) => {
    const atividade = createMemo(() => props.atividades().get(props.id))

    return (
        <DraggableHook id={atividade()?.parentId} data={props.id + '::' + props.drop}>
            <div className='w-fit flex py-1'>
                <For each={atividade()?.tags}>
                    {(tag) => <div className='tag-sm color-black-fundo' style={{
                        background: props.tags()[tag.id] ? props.tags()[tag.id].color : tag.color
                    }}
                    >{props.tags()[tag.id] ? props.tags()[tag.id].title  : tag.title}
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

const DroppableArea = ({ id, title, dados, semana, dia, interval, tags, ...props }) => {

    return (
        <Droppable id={id} className="w-full h-full p-2">
            <div className={style.area}>
                <For each={Object.values(dados.inside[semana]?.[dia]?.[interval] || {})}>
                    {(item) => {
                        return <Draggable tags={tags} atividades={props.atividades} {...item} />
                    }}
                </For>
            </div>
        </Droppable>
    )
}

export default function Main(props) {

    const { dados, dispatch: { addInside } } = useStorage()

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

    // createEffect(() => {
    //     setTimeout(() => {
    //         batch(() => {
    //             semanas.forEach(semana => {
    //                 lines.forEach(interval => {
    //                     col.forEach(col => {
    //                         addInside({ atividade: "0d42160e-474d-42e1-b500-3f84ad67a056", drop: [semana, col, interval] })
    //                         addInside({ atividade: "9beccf94-299e-43a0-9c51-bcc893e2a8eb", drop: [semana, col, interval] })
    //                         addInside({ atividade: "4eb6120f-4218-4d52-aaf8-22cb64e36083", drop: [semana, col, interval] })
    //                         // addInside({ atividade: "f5f591df-3303-45d2-a002-f7781868a83d", drop: [semana, col, interval] })
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
                                                                <DroppableArea tags={props.tags} id={id(semana, dia, interval)} dia={dia}
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
import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
} from "@thisbeyond/solid-dnd";

import SemanalSelector from '../SemanalSelector';
import { batch, createEffect, createMemo, createSignal, For, on } from 'solid-js';
import { useStorage } from '../../../Storage/context';
import { Draggable as DraggableHook, Droppable as DroppableHook } from '@/Apps/Capitulo1/components/hooks/DragAndDrop';

const Draggable = (props) => {
    const atividade = createMemo(()=>props.atividades().get(props.id))
    return (
        <DraggableHook id={atividade().parentId} data={props.id+'::'+props.drop}>
            <div className='w-fit flex py-1'>
                <For each={atividade().tags}>
                    {(tag) => <div className='tag-sm color-black-fundo' style={{ background: tag.color }}>{tag.title}</div>}
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

const DroppableArea = ({ id, title, dados, semana, dia, interval, ...props }) => {

    return (
        <Droppable id={id} className="w-full h-full p-2">
            <div className={style.area}>
                <For each={Object.values(dados.inside[semana]?.[dia]?.[interval] || {})}>
                    {(item) => {
                        return <Draggable atividades={props.atividades} {...item} />
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
        setWeek(e)
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
    //                         addInside({ atividade: "85eb4a03-fd53-42bb-931c-132812865db9", drop: [semana, col, interval] })
    //                         addInside({ atividade: "5d4b0e23-1485-4045-b8d3-d4485fc9142d", drop: [semana, col, interval] })
    //                         addInside({ atividade: "43649911-9f95-4213-9d44-b5829afdc7fb", drop: [semana, col, interval] })
    //                         addInside({ atividade: "f5f591df-3303-45d2-a002-f7781868a83d", drop: [semana, col, interval] })
    //                         addInside({ atividade: "351087fc-4b5b-4506-866d-0529c4d1286e", drop: [semana, col, interval] })
    //                     })
    //                 })
    //             })
    //         })
    //     }, 1000);
    // })

    return (
        <div className={style.main} id="main_content">

            <SemanalSelector semanas={semanas} week={week} dados={dados} handleWeek={handleWeek} />

            <div className={`black-scroll ${style.table}`}>
                <For each={semanas}>
                    {(semana) => {
                        return (week() == semana) ? (
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
                                                                <DroppableArea id={id(semana, dia, interval)} dia={dia}
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
                        ) : ''
                    }}
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
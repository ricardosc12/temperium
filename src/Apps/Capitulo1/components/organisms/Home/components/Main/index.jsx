import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
} from "@thisbeyond/solid-dnd";

import SemanalSelector from '../SemanalSelector';
import { batch, createEffect, createMemo, createSignal, For } from 'solid-js';
import { useStorage } from '../../../Storage/context';
import { Draggable as DraggableHook, Droppable as DroppableHook } from '@/Apps/Capitulo1/components/hooks/DragAndDrop';

const Draggable = (props) => {
    return (
        <DraggableHook data={props.id+'::'+props.drop}>
            <div className='w-fit flex py-1'>
                <For each={props.atividades().get(props.id).tags}>
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
    //                         addInside({ atividade: "e574f7f1-1cff-4adf-a5fe-d792c1388c80", drop: [semana, col, interval] })
    //                         addInside({ atividade: "214d0a89-32dd-4038-a81b-0c03304bbe0f", drop: [semana, col, interval] })
    //                         addInside({ atividade: "9d1418b3-9897-43ed-8b68-8528cbd5acef", drop: [semana, col, interval] })
    //                         addInside({ atividade: "d58e6d86-b600-4131-be1d-1566ffa31d19", drop: [semana, col, interval] })
    //                         addInside({ atividade: "5ec32eba-5516-49d4-a4d4-758cfd522788", drop: [semana, col, interval] })
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
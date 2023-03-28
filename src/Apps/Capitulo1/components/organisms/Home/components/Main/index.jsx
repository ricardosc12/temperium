import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
  } from "@thisbeyond/solid-dnd";


import { useStore } from '../../storage';
import { CLASS_NAME } from '../../storage';
import SemanalSelector from '../SemanalSelector';
import { createEffect, createMemo, createSignal, For, Show, Switch } from 'solid-js';

 
const Draggable = ({id, drop}) => {
    const draggable = createDraggable(`i${drop}atividade:${id}`,{drop:drop, atividade:id, inside:true});
    return (
        <div use:draggable className={`
        atividade atividade_p m-2
        ${draggable.isActiveDraggable?'opacity-75':''}`}>
            {CLASS_NAME[id]}
        </div>
    );
};

const Droppable = ({id, ...props}) => {

    const droppable = createDroppable(id());

    return (
        <div
            use:droppable={droppable}
            class="droppable"
            classList={{ "!droppable-accept": droppable.isActiveDroppable }}
            {...props}
        >
            {props.children}
        </div>
    );
};

const DroppableArea=({id, title, inside, semana, dia, interval, ...props})=>{

    return (
        <Droppable id={id} className="w-full h-full">
            <div className={style.area}>
                <For each={Object.values(inside[semana]?.[dia]?.[interval]||{})}>
                    {(item)=>{
                        return <Draggable id={item.id} drop={item.drop}/>
                    }}
                </For>
            </div>
        </Droppable>
    )
}

export default function Main(){

    const inside = useStore(state=>state.dados.inside)

    const semanas = [
        'semana1','semana2','semana3','semana4','semana5'
    ]

    const [week, setWeek] = createSignal(semanas[0])
    
    function handleWeek(e){
        setWeek(e)
    }

    const id = (week, dia, interval) => {
        return ()=>`week:${week}dia:${dia}interval:${interval}`
    }

    const lines = [
        '7', '8', '9', '10', '11', '12'
    ];
    // '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18:30', '19:20', '20:30', '21:20'
    const col = [
        "dom", "seg", "ter", "qua", "qui", "sex", "sab"
    ];

    return (
        <div className={style.main} id="main_content">

            <SemanalSelector semanas={semanas} week={week} inside={inside} handleWeek={handleWeek}/>

            <div className='m-auto'>
                <For each={semanas}>
                    {(semana)=>{
                        return ( 
                            <div className={`flex flex-row black-scroll ${week()!=semana?"hidden":""}`}>
                            <table className={style.root_table}>
                                <tbody>
                                    <For each={lines}>
                                        {(interval)=>(
                                            <tr>
                                                <For each={col}>
                                                    {(dia)=>(
                                                        <td>
                                                            <DroppableArea id={id(semana, dia, interval)} dia={dia} semana={semana} interval={interval} inside={inside}/>
                                                        </td>
                                                    )}
                                                </For>
                                            </tr>
                                        )}
                                    </For>
                                </tbody>
                            </table>
                            </div>
                        )
                    }}
                </For>
            </div>

        </div>
    )
}

const Teste=({week})=>{

    createEffect(()=>{
        console.log(week())
    })

    return <div>{week()}</div>
}
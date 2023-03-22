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
    const draggable = createDraggable(id,{drop:drop});
    return (
        <div use:draggable className={`
        atividade atividade_p m-2
        ${draggable.isActiveDraggable?'opacity-75':''}`}>
            {CLASS_NAME[id?.split('-')[1]]}
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

const DroppableArea=({id, title, inside, ...props})=>{

    return (
        <Droppable id={id} className={'border-black-fundo mx-2'}>
            <h1 className='m-2 color-black-fundo'>{title}</h1>
            <div className={style.area}>
                <For each={Object.values(inside[id]||{})}>
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

    const id = (week, dia) => {
        return ()=>`week:${week}dia:${dia}`
    }

    return (
        <div className={style.main} id="main_content">

            <SemanalSelector semanas={semanas} handleWeek={handleWeek}/>
                <For each={semanas}>
                    {(semana)=>{
                        return (
                            <div className={`flex flex-row black-scroll ${week()!=semana?"hidden":""}`}>
                                <DroppableArea id={id(semana,`seg`)} title="Segunda-Feira" inside={inside}/>

                                <DroppableArea id={id(semana,`terc`)} title="Terça-Feira" inside={inside}/>

                                <DroppableArea id={id(semana,`quart`)} title="Quarta-Feira" inside={inside}/>

                                <DroppableArea id={id(semana,`quint`)} title="Quinta-Feira" inside={inside}/>

                                <DroppableArea id={id(semana,`sext`)} title="Sexta-Feira" inside={inside}/>
                            </div>
                        )
                    }}
                </For>

            <pre><code>{JSON.stringify(inside,undefined,2)}</code></pre>

            {/* <Teste week={id(week,`seg`)}/> */}

        </div>
    )
}

const Teste=({week})=>{

    createEffect(()=>{
        console.log(week())
    })

    return <div>{week()}</div>
}
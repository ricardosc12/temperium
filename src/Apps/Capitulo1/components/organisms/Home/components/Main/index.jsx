import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
  } from "@thisbeyond/solid-dnd";


import { useStore } from '../../storage';
import { CLASS_NAME } from '../../storage';

 
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

const Droppable = ({id,...props}) => {
    const droppable = createDroppable(id);
    return (
        <div
            use:droppable
            class="droppable"
            classList={{ "!droppable-accept": droppable.isActiveDroppable }}
            {...props}
        >
            {props.children}
        </div>
    );
};

const DroppableArea=({id, title, inside})=>{
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

    return (
        <div className={style.main} id="main_content">

            <div className='flex flex-row'>
                <DroppableArea id="seg" title="Segunda-Feira" inside={inside}/>

                <DroppableArea id="terc" title="Terça-Feira" inside={inside}/>

                <DroppableArea id="quart" title="Quarta-Feira" inside={inside}/>

                <DroppableArea id="quint" title="Quinta-Feira" inside={inside}/>

                <DroppableArea id="sext" title="Sexta-Feira" inside={inside}/>
            </div>

        </div>
    )
}
import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
  } from "@thisbeyond/solid-dnd";

import { For } from "solid-js";
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

export default function Main(){

    const inside = useStore(state=>state.dados.inside)

    return (
        <div className={style.main} id="main_content">
            <Droppable id="seg" className={'border-green mx-5'}>
                <h1 className='m-2'>Segunda-Feira</h1>
                <div className={style.area}>
                    <For each={Object.values(inside['seg']||{})}>
                        {(item)=>{
                            return <Draggable id={item.id} drop={item.drop}/>
                        }}
                    </For>
                </div>
            </Droppable>

            <Droppable id="terc" className={'border-green mx-5'}>
                <h1 className='m-2'>Terça-Feira</h1>
                <div className={style.area}>
                    <For each={Object.values(inside['terc']||{})}>
                        {(item)=>{
                            return <Draggable id={item.id} drop={item.drop}/>
                        }}
                    </For>
                </div>
            </Droppable>
        </div>
    )
}
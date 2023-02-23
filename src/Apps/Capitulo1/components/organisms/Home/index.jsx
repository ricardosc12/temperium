import Atividades from "./components/Atividades"
import Main from "./components/Main"
import style from './style.module.css'
import { createSignal } from "solid-js";

import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    createDroppable,
    DragOverlay,
  } from "@thisbeyond/solid-dnd";

import { useStore } from "./storage";
import { CLASS_NAME } from "./storage";


export default function HomePage(){

    const { dispatch:{ addInside, removeInside} } = useStore(state=>state.change)

    const [atual, setAtual] = createSignal(null)

    const onDragEnd = ({ droppable, draggable }) => {
        setAtual(null)
        if (droppable && !draggable?.id?.includes('i')) {
            addInside(draggable.id)
        } else if (!droppable) {
            removeInside(draggable.id.split('-')[1])
        }
    };

    const onDragStart=({draggable})=>{
        setAtual(draggable.id.includes("i")?CLASS_NAME[draggable.id.split('-')[1]]:CLASS_NAME[draggable.id])
    }

    return (
        <div className={style.home}>
            <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>

                <DragDropSensors />

                <Main/>

                <Atividades/>

                <DragOverlay>
                    <Show when={atual()} fallback={<div>Atividade</div>}>
                        <div className='atividade_overlay'>{atual()}</div>
                    </Show>
                </DragOverlay>

            </DragDropProvider>
        </div>
    )
}
import Atividades from "./components/Atividades"
import Main from "./components/Main"
import style from './style.module.css'
import { createEffect, createSignal } from "solid-js";

import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    createDroppable,
    DragOverlay,
  } from "@thisbeyond/solid-dnd";

import { useAtividades } from "./storage/gerenciamento/atividades";


export default function HomePage(){

    const { dispatch:{ addInside, removeInside, transferSide} } = useAtividades(state=>state.change)

    const [atual, setAtual] = createSignal(null)

    let shift=false;

    const keyDown=(e)=>{
        if(e.key=="Shift") shift=true;
    }

    const keyUp=(e)=>{
        if(e.key=="Shift") shift=false;
    }

    const onDragEnd = ({ droppable, draggable }) => {
        setAtual(null)
        if(current_node) current_node.style['box-shadow'] = "none"
        setTimeout(()=>{
            document.getElementById('lateralbar-atividades').colapse(false)
        })
        if(droppable) {

            const { atividade, inside, drop, title } = draggable.data

            const [ toWeek, toDay, toInterval ] = droppable?.id.split(/week:|dia:|interval:/).filter(Boolean)
            const [ fromWeek, fromDay, fromInterval ] = drop?.split(/week:|dia:|interval:/).filter(Boolean) || [false, false, false]

            if(inside && shift==false && (toWeek!=fromWeek || toDay!=fromDay || toInterval!=fromInterval)) {
                transferSide({
                    atividade: atividade,
                    to:[toWeek, toDay, toInterval],
                    from:[fromWeek, fromDay, fromInterval]
                })
            }

            else if (!inside || (inside && shift)) {
                addInside({atividade: atividade || draggable.id, drop: [toWeek, toDay, toInterval], title:title})
            }
        }
        else {
            const { atividade, drop } = draggable.data
            if(!drop) return
            removeInside({
                atividade: atividade,
                from: drop.split(/week:|dia:|interval:/).filter(Boolean)
            })
        }
    };

    const onDragStart=({draggable})=>{
        setTimeout(()=>{
            document.getElementById('lateralbar-atividades').colapse(true)
        })
        const atividade = draggable.data.title
        setAtual(atividade)
    }

    let current_node;

    const onDragOver = ({ draggable, droppable }) => {
        const node = droppable?.node
        if(node) {
            if(current_node) current_node.style['box-shadow'] = "none"
            node.style['box-shadow'] = "0px 0px 1px 1px var(--black-destaq)"
            current_node = node
        }
    }

    return (
        <div tabindex="0" onKeyDown={keyDown} onKeyUp={keyUp} className={style.home}>
            <DragDropProvider onDragOver={onDragOver} onDragEnd={onDragEnd} onDragStart={onDragStart}>

                <DragDropSensors />

                <Main/>

                <Atividades/>

                <DragOverlay class={style.overlay}>
                    {(draggable) => <div class={style.atividade_overlay}>{atual()}</div>}
                </DragOverlay>

            </DragDropProvider>
        </div>
    )
}
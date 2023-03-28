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

    const { dispatch:{ addInside, removeInside, transferSide} } = useStore(state=>state.change)

    const [atual, setAtual] = createSignal(null)

    const onDragEnd = ({ droppable, draggable }) => {
        setAtual(null)
        if(current_node) current_node.style.border = "none"
        if(droppable) {
            const { atividade, inside, drop } = draggable.data
            

            const [ toWeek, toDay, toInterval ] = droppable?.id.split(/week:|dia:|interval:/).filter(Boolean)
            const [ fromWeek, fromDay, fromInterval ] = drop?.split(/week:|dia:|interval:/).filter(Boolean) || [false, false, false]

            if(inside && (toWeek!=fromWeek || toDay!=fromDay || toInterval!=fromInterval)) {
                transferSide({
                    atividade: atividade,
                    to:[toWeek, toDay, toInterval],
                    from:[fromWeek, fromDay, fromInterval]
                })
            }

            else if (!inside) {
                addInside({atividade: draggable.id, drop: [toWeek, toDay, toInterval]})
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
        const atividade = draggable.data.atividade || draggable.id
        setAtual(CLASS_NAME[atividade])
    }

    let current_node;

    const onDragOver = ({ draggable, droppable }) => {
        const node = droppable?.node
        if(node) {
            if(current_node) current_node.style.border = "none"
            node.style.border = "dotted 1px black"
            current_node = node
        }
    }

    return (
        <div className={style.home}>
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
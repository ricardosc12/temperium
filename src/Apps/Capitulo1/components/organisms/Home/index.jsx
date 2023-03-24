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
        if(droppable) {
            const { atividade, inside, drop } = draggable.data
            

            const [ toWeek, toDay ] = droppable?.id.split(/week:|dia:/).filter(Boolean)
            const [ fromWeek, fromDay ] = drop?.split(/week:|dia:/).filter(Boolean) || [false, false]

            if(inside && (toWeek!=fromWeek || toDay!=fromDay)) {
                transferSide({
                    atividade: atividade,
                    to:[toWeek, toDay],
                    from:[fromWeek, fromDay]
                })
            }

            else if (!inside) {
                addInside({atividade: draggable.id, drop: [toWeek, toDay]})
            }
        }
        else {
            const { atividade, drop } = draggable.data
            if(!drop) return
            removeInside({
                atividade: atividade,
                from: drop.split(/week:|dia:/).filter(Boolean)
            })
        }
    };

    const onDragStart=({draggable})=>{
        const atividade = draggable.data.atividade || draggable.id
        setAtual(CLASS_NAME[atividade])
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
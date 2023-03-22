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
            const [ semana, dia ] = droppable?.id.split(/week:|dia:/).filter(Boolean)
            addInside({drag:draggable.id,drop:[semana, dia]})
            console.log(semana, dia)
        }
        // console.log(droppable?.id)
        // console.log(draggable?.id)
        // if (droppable) {
        //     if(draggable?.id?.includes('i') && draggable.id.split('/')[1] != droppable.id) {
        //         transferSide({drop:{
        //             from: draggable.id.split('/')[1],
        //             to: droppable.id
        //             },
        //             drag:draggable.id.split('-')[1]
        //         })
        //     }
        //     else if (!draggable?.id?.includes('i')){
        //         addInside({drag:draggable.id,drop:droppable.id})
        //     }
        // } else if (!droppable) {
        //     removeInside({drop:draggable.data.drop, drag:draggable.id.split('-')[1]})
        // }
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
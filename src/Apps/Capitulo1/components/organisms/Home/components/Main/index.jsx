import style from './style.module.css'

import {
    DragDropProvider,
    DragDropSensors,
    createDraggable,
    createDroppable,
    DragOverlay,
  } from "@thisbeyond/solid-dnd";

import { createSignal, Show, For } from "solid-js";

import { useStore } from '../../storage';
import { CLASS_NAME } from '../../storage';
  
const Draggable = ({id}) => {
    const draggable = createDraggable(id);
    return (
        <div use:draggable className={`
        atividade atividade_p m-2
        ${draggable.isActiveDraggable?'opacity-75':''}`}>
            {CLASS_NAME[id?.split('-')[1]]}
        </div>
    );
};

const Droppable = (props) => {
    const droppable = createDroppable(1);
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

const DragAndDropExample = () => {
    // const [where, setWhere] = createSignal("outside");
    const [inside, setInside] = createSignal({})

    const [atual, setAtual] = createSignal(null)


    const onDragEnd = ({ droppable, draggable }) => {
        setAtual(null)
        if (droppable && !draggable?.id?.includes('inside')) {
            setInside((prev)=>{
                prev = {...prev, [`inside-${draggable.id}`]:{id:`inside-${draggable.id}`}}
                return prev
            })
        } else if (!droppable) {
            setInside((prev)=>{
                let items = {...prev}
                delete items[`inside-${draggable.id.split('-')[1]}`]
                return items
            })
        }
    };

    const onDragStart=({draggable})=>{
        setAtual(draggable.id)
    }

    return (
        <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <DragDropSensors />
            <div className="h-40 w-48 bg-icons-header">
                <Draggable id={'1'} />
                <Draggable id={'2'} />
            </div>
            <Droppable id="march">
                <div className={style.area}>
                    <For each={Object.values(inside()||{})}>
                        {(item)=>{
                            return <Draggable id={item.id}/>
                        }}
                    </For>
                </div>
            </Droppable>
            <DragOverlay>
                <Show when={atual()} fallback={<div>Atividade</div>}>
                    <div className='bg-primary rounded-xl p-1 cursor-pointer'>{atual()}</div>
                </Show>
            </DragOverlay>
        </DragDropProvider>
    );
};

export default function Main(){

    const inside = useStore(state=>state.dados.inside)

    return (
        <div className={style.main} id="main_content">
            {/* <DragAndDropExample/> */}
            <Droppable id="march" className={'border-green'}>
                <div className={style.area}>
                    <For each={Object.values(inside||{})}>
                        {(item)=>{
                            return <Draggable id={item.id}/>
                        }}
                    </For>
                </div>
            </Droppable>
        </div>
    )
}
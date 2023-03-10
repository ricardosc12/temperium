import style from './style.module.css'

import {
    createDraggable,
    createDroppable,
  } from "@thisbeyond/solid-dnd";

import { useStore } from '../../storage';
import { CLASS_NAME } from '../../storage';
import { createModal } from '@/Apps/Capitulo1/components/molecules/Modal';
import { createEffect } from 'solid-js';

import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
  
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

const ModalUpdate=()=>{
 
    async function update(){
        try {
            const { shouldUpdate, manifest } = await checkUpdate()
            if (shouldUpdate) {
              // display dialog
              const update = await installUpdate()
              console.log(shouldUpdate,update)
              // install complete, restart the app
              await relaunch()
            }
          } catch (error) {
            console.log(error)
          }
    }

    return (
        <button onClick={update}>Update</button>
    )
}

export default function Main(){

    const inside = useStore(state=>state.dados.inside)

    const { open, close } = createModal(<div className="flex w-52 h-32 background-white-fundo rounded-2xl items-center justify-center">
        <ModalUpdate/>
    </div>)

    return (
        <div className={style.main} id="main_content">

            <div className='flex flex-row'>
                <DroppableArea id="seg" title="Segunda-Feira" inside={inside}/>

                <DroppableArea id="terc" title="Terça-Feira" inside={inside}/>

                <DroppableArea id="quart" title="Quarta-Feira" inside={inside}/>

                <DroppableArea id="quint" title="Quinta-Feira" inside={inside}/>

                <DroppableArea id="sext" title="Sexta-Feira" inside={inside}/>
            </div>

            <div className={style.button_modal}>
                <button onClick={open}>
                    <svg className='icon-svg' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.263 6.913T12 22Z"/></svg>
                    <p>Modal 1.2.0</p>
                </button>
            </div>

        </div>
    )
}
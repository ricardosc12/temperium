import {
    createDraggable,
} from "@thisbeyond/solid-dnd";
import style from './style.module.css'
import { ArrowIcon, IconGrab, IconRead, IconWorkSpace } from "@/Apps/Capitulo1/assets/Icons";
import { createEffect, createSignal, For } from "solid-js";

const Draggable = ({ id, children, title, ...props }) => {
    const draggable = createDraggable(id, { title });

    return (
        <div use:draggable className={`
        cursor-pointer
        ${draggable.isActiveDraggable ? 'opacity-75 border-green' : ''}`}
            {...props}
        >
            {children}
        </div>
    );
};

const Atividade = ({ id, title, children, icon, label }) => {
    return (
        <Draggable className="w-full" id={id} title={label + " - " + title}>
            <div className="w-full flex flex-row items-center mb-5">
                <div className={style.icon_grab}><IconGrab /></div>
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <h5>{title}</h5>
                        <div>{icon}</div>
                    </div>
                    <p>{children}</p>
                </div>
            </div>
        </Draggable>
    )
}

export function CardAtividade({ id, title, atividades, atividade_description }) {

    const [open, setOpen] = createSignal(true)
    const collapse = () => setOpen(prev => !prev)

    let ref;

    createEffect(()=>{
        ref.style.setProperty('--max-height', ref.scrollHeight + 'px');
    })

    return (
            <div onClick={collapse} ref={ref} className={`${style.card_atividade} ${open() ? style.collapse : ''}`}>
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h2 className="text-sm">{title}</h2>
                    </div>
                    <div className={style.icon_card_atividade}>
                        <ArrowIcon />
                    </div>
                </div>
                <div className={style.atividades}>
                    <h5>{atividade_description}</h5>
                    <div className={style.divisor}></div>
                    <div className={style.main_atividades}>

                        <For each={atividades}>
                            {(item) => {
                                return (
                                    <Atividade id={item.id} title={item.title} label={title} icon={<IconRead />}>
                                        {item.description}
                                    </Atividade>
                                )
                            }}
                        </For>
                    </div>
                </div>
            </div>
    )
}
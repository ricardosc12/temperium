import Atividades from "./components/Atividades"
import Main from "./components/Main"
import style from './style.module.css'
import { createEffect, createSignal, on } from "solid-js";

import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
} from "@thisbeyond/solid-dnd";

import { DragAndDrop } from "../../hooks/DragAndDrop";

import { useStorage } from "../Storage/context";
import { untrack } from "solid-js/web";

export default function HomePage() {

    const { dispatch: { addInside, removeInside, transferSide }, dados } = useStorage()

    const [atividades, setAtividades] = createSignal(new Map(), { equals: false })

    createEffect(() => {
        console.time('mapping disciplinhas')
        const disciplinas = JSON.parse(JSON.stringify(dados.disciplinas))
        untrack(() => {
            disciplinas.forEach((item, index) => {
                atividades().set(item.id, item)
                item.atividades.forEach((atividade, _) => {
                    atividades().set(atividade.id, atividade)
                })
            });
            setAtividades(atividades())
        })

        console.timeEnd('mapping disciplinhas')
    })

    createEffect(() => {
        console.time('mapping atividades')
        const tarefas = JSON.parse(JSON.stringify(dados.tarefas))
        untrack(() => {
            tarefas.forEach((item, index) => {
                atividades().set(item.id, item)
                item.atividades.forEach((atividade, _) => {
                    atividades().set(atividade.id, atividade)
                })
            });
            setAtividades(atividades())
        })
        console.timeEnd('mapping atividades')
    })

    const [atual, setAtual] = createSignal(null)

    let shift = false;

    const keyDown = (e) => {
        if (e.key == "Shift") shift = true;
    }

    const keyUp = (e) => {
        if (e.key == "Shift") shift = false;
    }

    const onDragEnd = ({ droppable, draggable }) => {
        if (!draggable) return
        setAtual(null)
        if (current_node) current_node.style['box-shadow'] = "none"
        setTimeout(() => {
            document.getElementById('lateralbar-atividades').colapse(false)
        })
        if (droppable.el) {
            const [atividadeId, drop] = draggable.data.split('::')
            const { id } = atividades().get(atividadeId)

            const [toWeek, toDay, toInterval] = droppable.data.split(/week:|dia:|interval:/).filter(Boolean)
            const [fromWeek, fromDay, fromInterval] = drop?.split(/week:|dia:|interval:/).filter(Boolean) || [false, false, false]

            if (drop && shift == false && (toWeek != fromWeek || toDay != fromDay || toInterval != fromInterval)) {
                transferSide({
                    atividade: id,
                    to: [toWeek, toDay, toInterval],
                    from: [fromWeek, fromDay, fromInterval]
                })
            }
            else if (!drop || (drop && shift)) {
                addInside({ atividade: id, drop: [toWeek, toDay, toInterval] })
            }
        }

        else {
            const [atividadeId, drop] = draggable.data.split('::')
            const { id } = atividades().get(atividadeId)
            if (!drop) return
            removeInside({
                atividade: id,
                from: drop.split(/week:|dia:|interval:/).filter(Boolean)
            })
        }
    };

    const onDragStart = ({ draggable }) => {
        // setTimeout(() => {
        document.getElementById('lateralbar-atividades').colapse(true)
        // })
        // const atividade = draggable.data.title
        // setAtual(atividade)
    }

    let current_node;

    const onDragOver = ({ draggable, droppable }) => {
        if (droppable) {
            if (current_node) current_node.style['box-shadow'] = "none"
            droppable.el.style['box-shadow'] = "0px 0px 1px 1px var(--black-destaq)"
            current_node = droppable.el
        }
    }

    const onDragLeave = ({ droppable }) => {
        if (current_node) current_node.style['box-shadow'] = "none"
        droppable.el.style['box-shadow'] = "none"
        current_node = null
    }

    return (
        <div tabindex="0" onKeyDown={keyDown} onKeyUp={keyUp} className={style.home}>
            <DragAndDrop onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragOver}>
                {/* <DragDropProvider onDragOver={onDragOver} onDragEnd={onDragEnd} onDragStart={onDragStart}> */}

                {/* <DragDropSensors /> */}

                <Main atividades={atividades} />

                <Atividades />

                {/* <DragOverlay class={style.overlay}> */}
                {/* {(draggable) => <div class={style.atividade_overlay}>{atual()}</div>} */}
                {/* </DragOverlay> */}

                {/* </DragDropProvider> */}
            </DragAndDrop>
        </div>
    )
}
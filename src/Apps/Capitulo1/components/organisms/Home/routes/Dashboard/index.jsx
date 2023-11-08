import Main from "../../components/Main"
import style from './style.module.css'
import { DragAndDrop } from "@/Apps/Capitulo1/components/hooks/DragAndDrop";
import { useStorage } from "../../../Storage/context";
import { createAtividades } from "../../hooks/createAtividades";
import { createTags } from "../../hooks/createTags";


export default function DashboardMode() {

    const { dispatch: { addInside, removeInside, transferSide }, dados } = useStorage()
    const atividades = createAtividades(dados)
    const tags = createTags(dados)
    
    let shift = false;

    const keyDown = (e) => {
        if (e.key == "Shift") shift = true;
    }

    const keyUp = (e) => {
        if (e.key == "Shift") shift = false;
    }

    const onDragEnd = ({ droppable, draggable }) => {
        setTimeout(() => {
            document.getElementById('lateralbar-atividades').colapse(false)
        })
        if (!draggable) return

        if (current_node) current_node.style['box-shadow'] = "none"
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

    const onDragTerminate=()=>{
        setTimeout(() => {
            document.getElementById('lateralbar-atividades').colapse(false)
        })
    }

    const onDragStart = () => {
        document.getElementById('lateralbar-atividades').colapse(true)
    }

    let current_node;

    const onDragOver = ({ droppable }) => {
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
        <div tabindex="0" onKeyDown={keyDown} onKeyUp={keyUp} className={style.root_dash}>
            <DragAndDrop onDragTerminate={onDragTerminate} onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragOver}>

                <Main tags={tags} atividades={atividades} />

                {/* <Atividades tags={tags}/> */}

            </DragAndDrop>
        </div>
    )
}
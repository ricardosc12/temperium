import { DragAndDrop } from '@/Apps/Capitulo1/components/hooks/DragAndDrop'
import style from './style.module.css'
import { createEffect, createSignal } from 'solid-js'
import { useStorage } from '@/Apps/Capitulo1/components/organisms/Storage/context'
import { createAtividades } from '../../../../hooks/createAtividades'
import { createBacklog } from './hooks/createBacklog'


export default function MainTodo(props) {

    const { dados } = useStorage()
    const atividades = createAtividades(dados)
    const backlog = createBacklog(dados, props.mode)

    function onDragTerminate() {

    }
    function onDragLeave() {

    }
    function onDragStart() {

    }
    function onDragEnd() {

    }
    function onDragOver() {

    }

    return (
        <div className={style.root_main_todo}>
            <DragAndDrop onDragTerminate={onDragTerminate} onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragOver}>
                MAIN
            </DragAndDrop>
        </div>
    )
}
import { DragAndDrop, Draggable, Droppable } from '@/Apps/Capitulo1/components/hooks/DragAndDrop'
import style from './style.module.css'
import { createEffect, createSignal, For } from 'solid-js'
import { useStorage } from '@/Apps/Capitulo1/components/organisms/Storage/context'
import { createAtividades } from '../../../../hooks/createAtividades'
import { createBacklog } from './hooks/createBacklog'


export default function MainTodo(props) {

    const { dados, dispatch: { changeStatus } } = useStorage()
    const atividades = createAtividades(dados)
    const { backlog, day, week } = createBacklog(dados, props.mode)

    function onDragTerminate() {

    }
    function onDragLeave() {

    }
    function onDragStart() {

    }
    function onDragEnd({ draggable, droppable }) {
        const [id, inside] = draggable.data.split('::')
        const from = inside.split(';')
        const status = droppable.data

        changeStatus({
            atividade: id,
            from: from,
            status: status
        })

    }
    function onDragOver() {

    }

    return (
        <div className={style.root_main_todo}>
            <DragAndDrop onDragTerminate={onDragTerminate} onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragOver}>
                <div className='w-full'>TODO LIST</div>
                <div className='flex w-full items-center justify-around'>
                    <div>
                        <h3>IN TODO</h3>
                        <Droppable data='intodo'>
                            <div className='flex flex-col h-96 bg-icons-header w-44'>
                                <For each={backlog().intodo}>
                                    {(item) => {
                                        return (
                                            <Draggable id={item.id} data={item.id + '::' + item.inside.join(';')}>
                                                <div>{atividades().get(item.id)?.title}</div>
                                            </Draggable>
                                        )
                                    }}
                                </For>
                            </div>
                        </Droppable>
                    </div>
                    <div>
                        <h3>IN PROGRESS</h3>
                        <Droppable data='inprogress'>
                            <div className='flex flex-col h-96 bg-icons-header w-44'>
                                <For each={backlog().inprogress}>
                                    {(item) => {
                                        return (
                                            <Draggable id={item.id} data={item.id + '::' + item.inside.join(';')}>
                                                <div>{atividades().get(item.id)?.title}</div>
                                            </Draggable>
                                        )
                                    }}
                                </For>
                            </div>
                        </Droppable>
                    </div>
                    <div>
                        <h3>IN DONE</h3>
                        <Droppable data='indone'>
                        <div className='flex flex-col h-96 bg-icons-header w-44'>                        
                                <For each={backlog().indone}>
                                    {(item) => {
                                        return (
                                            <Draggable id={item.id} data={item.id + '::' + item.inside.join(';')}>
                                                <div>{atividades().get(item.id)?.title}</div>
                                            </Draggable>
                                        )
                                    }}
                                </For>                            
                        </div>
                        </Droppable>
                    </div>
                </div>
            </DragAndDrop>
        </div>
    )
}
import { DragAndDrop, Draggable, Droppable } from '@/Apps/Capitulo1/components/hooks/DragAndDrop'
import style from './style.module.css'
import { batch, createEffect, createSignal, For, onMount } from 'solid-js'
import { useStorage } from '@/Apps/Capitulo1/components/organisms/Storage/context'
import { createAtividades } from '../../../../hooks/createAtividades'
import { createBacklog } from './hooks/createBacklog'
import { createBackgroundColor } from '@/Apps/Capitulo1/utils/color'

function Card(props) {
    const atividade = props.atividades().get(props.id)
    if (!atividade) return

    return (
        <div className={style.board_item}>
            <div className={style.board_item_header}>
                <h3>{atividade.title}</h3>
                <span></span>
            </div>
            <div className='flex mt-1 flex-wrap'>
                <For each={atividade.tags}>
                    {(tag) => (
                        <div className="mr-2 mb-2 tag-md"
                            style={{ background: createBackgroundColor(tag.color), color: tag.color }}>
                            {tag.title}
                        </div>
                    )}
                </For>
            </div>
            <h5 className='mt-1'>{atividade.description}</h5>
            <div className='flex w-full items-center justify-between mt-2'>
                <span>
                    <h5>{props.inside[0].join(', ')} {props.inside.length>1?'...':''}</h5>
                </span>
                <span><h5>{props.inside.length}</h5></span>
            </div>
        </div>
    )
}

export default function MainTodo(props) {

    const { dados, dispatch: { changeStatus } } = useStorage()
    const atividades = createAtividades(dados)

    const { backlog, day, week } = createBacklog(dados, props.mode)

    const [grabbing, setGrabbing] = createSignal(false)

    const status_list = [
        { id: 'intodo', title: 'Pendente' },
        { id: 'inprogress', title: 'Em Andamento' },
        { id: 'indone', title: 'Concluídos' }
    ]

    function onDragTerminate() {
        setGrabbing({
            intodo: false,
            inprogress: false,
            indone: false,
        })
    }
    function onDragLeave() {

    }

    async function onDragStart(draggable) {
        const [_, status] = draggable.split('::')
        setGrabbing({
            intodo: true,
            inprogress: true,
            indone: true,
            [status]: false
        })
    }

    function onDragEnd({ draggable, droppable }) {
        const [id, from] = draggable.data.split('::')
        const status = droppable.data
        const to = backlog()[from].find(item => item.id == id)

        if (!to) return

        batch(() => {
            to.inside.forEach(item => {
                changeStatus({
                    atividade: id,
                    from: item,
                    status: status
                })
            })
            setGrabbing({
                intodo: false,
                inprogress: false,
                indone: false,
            })
        })

    }
    function onDragOver() {

    }

    return (
        <div className={style.root_main_todo}>
            <DragAndDrop onDragTerminate={onDragTerminate} onDragLeave={onDragLeave} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragEnter={onDragOver}>
                <div className='flex w-full items-start justify-around'>
                    <For each={status_list}>
                        {(status) => {
                            return (
                                <div className={style.item_list}>
                                    <div className={style.item_list_title}>
                                        <h3>{status.title}</h3>
                                        <span>{backlog()[status.id].length}</span>
                                    </div>
                                    <Droppable data={status.id}>
                                        <div className={style.item_list_board}>
                                            <div className={`${style.item_list_border} ${grabbing()[status.id] ? 'active' : ''}`}></div>
                                            <For each={backlog()[status.id]}>
                                                {(item) => {
                                                    return (
                                                        <Draggable id={item.id} data={item.id + '::' + status.id}>
                                                            <Card inside={item.inside} atividades={atividades} id={item.id} />
                                                        </Draggable>
                                                    )
                                                }}
                                            </For>
                                        </div>
                                    </Droppable>
                                </div>
                            )
                        }}
                    </For>
                </div>
            </DragAndDrop>
        </div>
    )
}
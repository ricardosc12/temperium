import { AddIcon } from '@/Apps/Capitulo1/assets/Icons'
import { createBackgroundColor } from '@/Apps/Capitulo1/utils/color'
import { createEffect, createMemo, For, onMount } from 'solid-js'
import { createModal } from '../../../molecules/Modal'
import { createTags } from '../../Home/hooks/createTags'
import { useStorage } from '../../Storage/context'
import ModalActivities from './Modal'
import style from './style.module.css'

export default function Atividades() {

    const { dados, dispatch: { addPomoActivitiesState, setPomoActivityState } } = useStorage()
    const pomodoro = dados.pomodoro

    const tags = createTags(dados)

    const { open } = createModal(ModalActivities, {
        id: 'modal-pomoActivities',
        props: {
            modalId: 'modal-pomoActivities',
            tags: tags
        }
    })

    const countChecked = createMemo(() => pomodoro.activitiesList.filter(item => item.statePomo).length)

    function handleCheckActivity(id) {
        const idx = pomodoro.activitiesList.findIndex(item => item.id == id)
        if (idx == -1) return
        setPomoActivityState({ idx, activityState: !pomodoro.activitiesList[idx].statePomo })
    }

    return (
        <div className={style.atividadesList}>
            <div className={style.header}>
                <h4>Atividades</h4>
                <div className='flex items-center'>
                    <h4>{countChecked()}/{pomodoro.activitiesList.length}</h4>
                    <button onClick={open} className='btn-base bg-[var(--roxinho)] color-main ml-3'>
                        <AddIcon height="20" className="-mx-3" />
                    </button>
                </div>
            </div>
            <div className={style.atividade_list}>
                <For each={pomodoro.activitiesList}>
                    {(item) => {
                        return (
                            <div aria-checked={item.statePomo} className={style.atividade_item} onClick={() => handleCheckActivity(item.id)}>
                                <div className='flex items-center'>
                                    <h4>{item.title}</h4>
                                    <h5>({item.parentTitle})</h5>
                                </div>
                                <div className='flex'>
                                    <For each={item.tags}>
                                        {(tag) => {
                                            const tagMap = tags()[tag.id]
                                            return tagMap ? <div
                                                style={{
                                                    background: createBackgroundColor(tagMap.color),
                                                    color: tagMap.color
                                                }}
                                                className='tag'>
                                                {tag.title}
                                            </div> : ''
                                        }}
                                    </For>
                                </div>
                                <div className={style.lineIndicator}></div>
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}
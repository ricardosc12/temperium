import { AddIcon, DotsIcon } from '@/Apps/Capitulo1/assets/Icons'
import { createBackgroundColor } from '@/Apps/Capitulo1/utils/color'
import { batch, createEffect, createMemo, createSignal, For, onMount } from 'solid-js'
import { unescapeLeadingUnderscores } from 'typescript'
import { createMenu } from '../../../hooks/Menu'
import { createModal } from '../../../molecules/Modal'
import { createTags } from '../../Home/hooks/createTags'
import { useStorage } from '../../Storage/context'
import { MenuAtividade, MenuAtividades } from './menu'
import ModalActivities from './Modal'
import { v4 as uuidv4 } from 'uuid';
import style from './style.module.css'

export default function Atividades() {

    const { dados, dispatch: { removePomoActivitiesState, setPomoActivityState,
        setPomoActivitiesState, addPomoActivitiesState } } = useStorage()
    const pomodoro = dados.pomodoro

    const tags = createTags(dados)
    const [stateCustom, setStateCustom] = createSignal(false)

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

    async function handleOptions(e, id) {
        const resp = await createMenu(e, MenuAtividade)
        if (resp === "excluir") {
            removePomoActivitiesState(id)
        }
    }

    async function handleAllOption(e) {
        const resp = await createMenu(e, MenuAtividades)
        if (resp === "excluir") {
            setPomoActivitiesState([])
        }
        if (resp === "adicionar") {
            setStateCustom(true)
            activityInput.focus()
        }
    }

    let activityInput;

    function handleAddCustomActivity() {
        const text = activityInput.value
        if (!text) return
        const atividade = {
            title: text,
            id: uuidv4()
        }
        batch(() => {
            setStateCustom(false)
            addPomoActivitiesState(atividade)
        })
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
                    <div onClick={e => handleAllOption(e)} className={style.atividades_option}><DotsIcon /></div>
                </div>
            </div>
            <div className={style.atividade_list}>
                <For each={pomodoro.activitiesList}>
                    {(item) => {
                        return (
                            <div className='flex items-center w-full'>
                                <div aria-checked={item.statePomo} className={style.atividade_item} onClick={() => handleCheckActivity(item.id)}>
                                    <div className='flex items-center'>
                                        <h4>{item.title}</h4>
                                        {item.parentTitle ? <h5>({item.parentTitle})</h5> : ""}
                                    </div>
                                    <div className='flex items-center'>
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
                                <div onClick={e => handleOptions(e, item.id)} className={style.atividade_option}><DotsIcon /></div>
                            </div>
                        )
                    }}
                </For>
                {stateCustom() ? (
                    <div className='w-full py-2' onKeyDown={e => e.key == 'Enter' && handleAddCustomActivity()}>
                        <input ref={activityInput} className={style.inputCustomActivity} placeholder='O que você quer fazer?' />
                        <div className='flex space-x-2 justify-end mt-3 mb-3'>
                            <button onClick={()=>setStateCustom(false)} className='btn-sm bg-[var(--roxinho)] text-[var(--primary)]'>Cancelar</button>
                            <button onClick={handleAddCustomActivity} className='btn-sm bg-main text-[white]'>Salvar</button>
                        </div>
                    </div>
                ) : ""}

            </div>
        </div>
    )
}
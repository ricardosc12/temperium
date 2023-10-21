import { AddIcon } from '@/Apps/Capitulo1/assets/Icons'
import { createBackgroundColor } from '@/Apps/Capitulo1/utils/color'
import { createMemo, For } from 'solid-js'
import { createTags } from '../../Home/hooks/createTags'
import { useStorage } from '../../Storage/context'
import style from './style.module.css'

export default function Atividades() {

    const { dados } = useStorage()

    const tags = createTags(dados)

    const atividades = createMemo(() => {
        let atividades_ = []
        for (let i = 0; i < dados.disciplinas.length; i++) {
            for (let j = 0; j < dados.disciplinas[i].atividades.length; j++) {
                atividades_.push(dados.disciplinas[i].atividades[j]);
            }
        }

        for (let i = 0; i < dados.tarefas.length; i++) {
            for (let j = 0; j < dados.tarefas[i].atividades.length; j++) {
                atividades_.push(dados.tarefas[i].atividades[j]);
            }
        }
        return atividades_
    })

    return (
        <div className={style.atividadesList}>
            <div className={style.header}>
                <h4>Atividades</h4>
                <div className='flex items-center'>
                    <h4>0/4</h4>
                    <button className='btn-base bg-[var(--roxinho)] color-main ml-3'>
                        <AddIcon height="20" className="-mx-3" />
                    </button>
                </div>
            </div>
            <div className='flex flex-col px-5'>
                <For each={atividades()}>
                    {(item) => {
                        return (
                            <div className='flex'>
                                <div>{item.title}</div>
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
                                ''
                            </div>
                        )
                    }}
                </For>
            </div>
        </div>
    )
}
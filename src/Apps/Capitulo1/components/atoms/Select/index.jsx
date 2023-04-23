import style from './style.module.css'
import '@/Apps/Capitulo1/styles/fluent-ui.css'
import { createEffect, createSignal, For, on } from 'solid-js'
import { createModal, HeaderModal } from '../../molecules/Modal'
import { useStorage } from '../../organisms/Storage/context'
import TextField from '../TextField'

export default function Select({ id, label, height = '30px', options = [] }) {

    const [selected, setSelected] = createSignal('estudo')

    const { open } = createModal(() => <Modal />, { closeOnBlur: true })

    createEffect(on(selected, (selected) => {
        var style = document.createElement('style')
        style.innerHTML = `
        .control { 
            padding-top: 3px !important;
            border-radius: 0 !important;
            min-height: ${height} !important;
            max-height: ${height} !important;
            background: transparent !important;
            border: none !important;
            border-bottom: 1px solid var(--black-destaq) !important;
        } 
        .selected-value::before {
            content: '';
            background: ${options.find(option => option.value == selected)?.color || '#000000'};
            border-radius: 0.375rem;
            margin-right:10px;
            display: flex;
            width: 12px;
            height: 12px;
        }
        .listbox {
            background: var(--white-fundo) !important;
        }
        .selected-value {
            display:flex;
            align-items:center;
        }
        * {
            outline: none;
            color: var(--white-fundo);
        }
        `
        document.getElementById('select').shadowRoot.appendChild(style)
    }))

    return (
        <div className={style.select} id={id}>
            <p>{label}</p>
            <fluent-select onChange={(e) => setSelected(e.target._value)} id="select" className="fluent-style" title="Selecione uma tag">
                <For each={options}>
                    {(option) => (
                        <fluent-option title={option.label} value={option.value}>
                            <div className='flex'>
                                <span style={{ background: option.color }}></span>
                                <p>{option.label}</p>
                            </div>
                        </fluent-option>
                    )}
                </For>
            </fluent-select>
        </div>
    )
}

const Modal = () => {

    const { dados } = useStorage()

    return (
        <div className='modal'>
            <HeaderModal title={"Adicionar ou remover Tags"} />
            <div className={style.root_modal_tags}>
                <h4 className='color-text-secondary'>
                    Adicione, edite ou remova tags primárias e secundárias.
                </h4>
                <div className='divisor'></div>
                <h3 className='mb-3'>Tags primárias</h3>
                <div className='flex mb-4 color-text-primary flex-wrap border rounded-md p-3'>
                    <For each={[...dados.tags.primary,...dados.tags.primary,...dados.tags.primary]}>
                        {(tag)=>(
                            <div className='tag-field'>
                                <span style={{background:tag.color}}></span>
                                <p>{tag.label}</p>
                            </div>
                        )}
                    </For>
                </div>
                <h3 className='mb-3'>Tags secundárias</h3>
                <div className='flex color-text-primary flex-wrap border rounded-md p-3'>
                    <For each={[...dados.tags.primary]}>
                        {(tag)=>(
                            <div className='tag-field'>
                                <span style={{background:tag.color}}></span>
                                <p>{tag.label}</p>
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    )
}
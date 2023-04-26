import style from './style.module.css'
import '@/Apps/Capitulo1/styles/fluent-ui.css'
import { createEffect, createSignal, For, on, splitProps } from 'solid-js'
import { createModal } from '../../molecules/Modal'
import { ModalTagSelector } from '../../molecules/Modal/TagSelector'
import { AddIcon } from '@/Apps/Capitulo1/assets/Icons'

export default function Select(props) {

    const [selected, setSelected] = createSignal('')

    const [_, others] = splitProps(props, ["id", "label"])

    const { open } = createModal(() => <ModalTagSelector />, { closeOnBlur: true })

    let ref;

    createEffect(() => {
        ref.role = "section"
    })

    createEffect(()=>{
        setSelected(others.options[0].id)
    })

    createEffect(on(selected, (selected) => {
        var style = document.createElement('style')
        style.innerHTML = `
        .control { 
            padding-top: 3px !important;
            border-radius: 0 !important;
            min-height: ${props.height} !important;
            max-height: ${props.height} !important;
            background: transparent !important;
            border: none !important;
            border-bottom: 1px solid var(--black-destaq) !important;
        } 
        .selected-value::before {
            content: '';
            background: ${props.options.find(option => option.id == selected)?.color || '#000000'};
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
        <div className={style.select} id={props.id}>
            <p>{props.label}</p>
            <fluent-select onChange={(e) => setSelected(e.target._value)} id="select" className="fluent-style" title="Selecione uma tag">

                <For each={props.options}>
                    {(option) => (
                        <fluent-option title={option.label} value={option.id}>
                            <div className='flex'>
                                <span style={{ background: option.color }}></span>
                                <p>{option.label}</p>
                            </div>
                        </fluent-option>
                    )}
                </For>
                <fluent-option onClick={open} ref={ref} title={"Create"}>
                    <div className={style.select_option}>
                        <AddIcon />
                        <p>Adicionar</p>
                    </div>
                </fluent-option>
            </fluent-select>
        </div>
    )
}

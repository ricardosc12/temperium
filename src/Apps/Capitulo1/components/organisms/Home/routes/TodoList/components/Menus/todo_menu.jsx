import { createEffect, createMemo, createSignal, For, onMount } from "solid-js"
import '@/Apps/Capitulo1/styles/fluent-ui.css'

export default function MenuTodo(props) {

    const [check, setCheck] = createSignal({})
    const selecionados = createMemo(() => Object.values(check()).filter(item => item))

    onMount(() => {
        setCheck(props.data.reduce((o, key, index) => ({ ...o, [index]: true }), {}))
    })

    function handleCheck(e) {
        setCheck(prev => ({ ...prev, [e.target.id]: e.target.checked }))
        e.stopPropagation()
    }

    function handleMove(e) {
        e.preventDefault()
        props.el.onblur = null
        props.el.remove()
        props.resolve(check())
    }

    return (
        <div className="flex flex-col justify-start items-start fluent-style">
            <h3 className="color-black-fundo font-medium mb-3">Mover de:</h3>
            <div className="max-h-72 overflow-y-scroll">
                <For each={props.data}>
                    {(item, index) => {
                        return (
                            <span className="flex items-center mb-2">
                                <fluent-checkbox checked id={index()} onChange={handleCheck} onMouseDown={e => e.preventDefault()}>
                                    <p className="color-black-fundo">{item.join(', ')}</p>
                                </fluent-checkbox>
                            </span>
                        )
                    }}
                </For>
            </div>
            <button onMouseDown={handleMove} className="btn-base bg-main ml-auto mt-3">
                Mover ({selecionados().length})
            </button>
        </div>
    )
}
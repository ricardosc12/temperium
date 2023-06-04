import { createSignal } from 'solid-js'
import HeaderTodo from './components/Header'
import MainTodo from './components/Main'
import style from './style.module.css'


export default function TodoListRoute() {

    const [mode, setMode] = createSignal('byweek')

    return (
        <div className={style.root_todo}>
            <HeaderTodo mode={mode} setMode={setMode}/>
            <MainTodo mode={mode}/>
        </div>
    )
}

// Deixar com que cada item do inside tenha um status, e controlar o todo com base nisso.
// Deixar o status na atividade gera problemas
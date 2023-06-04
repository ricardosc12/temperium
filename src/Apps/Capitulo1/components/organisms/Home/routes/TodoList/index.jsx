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
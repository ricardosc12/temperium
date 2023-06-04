import DashboardMode from "./routes/Dashboard";
import TodoListRoute from "./routes/TodoList";
import style from './style.module.css'
import { Switch, Match, createSignal } from "solid-js";

export default function HomePage() {

    const [mode, setMode] = createSignal('dashboard')


    return (
        <div className={style.home}>
            <div className="flex space-x-5">
                <h3 onClick={()=>setMode('dashboard')} className="color-black-fundo cursor-pointer">Dashboard</h3>
                <h3 onClick={()=>setMode('todolist')} className="color-black-fundo cursor-pointer">TodoList</h3>
            </div>
            <Switch fallback={() => <div>Loading...</div>}>
                <Match when={mode() == 'dashboard'}>
                    <DashboardMode />
                </Match>
                <Match when={mode() == "todolist"}>
                    <TodoListRoute />
                </Match>
            </Switch>
        </div>
    )
}
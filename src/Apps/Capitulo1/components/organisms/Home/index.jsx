import DashboardMode from "./routes/Dashboard";
import TodoListRoute from "./routes/TodoList";
import style from './style.module.css'
import { Switch, Match, createSignal } from "solid-js";
import HomeHeader from "./components/Header";

export default function HomePage() {

    const [mode, setMode] = createSignal('dashboard')

    return (
        <div className={style.home}>
            <HomeHeader mode={mode} setMode={setMode}/>
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
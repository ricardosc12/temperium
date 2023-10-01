import { createContext, createEffect, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { atividadesStorage } from "./atividades";
import { disciplinasStorage } from "./disciplinas";
import { gerenciamentoStorage } from "./gerenciamento";
import { pomodoroStorage } from "./pomodoro";
import { tagsStorage } from "./tags";

const CounterContext = createContext();

export const useStorage = () => useContext(CounterContext);

export function StorageProvider(props) {

    const [state, setState] = createStore({
        dados: {
            disciplinas: disciplinasStorage().disciplinas,
            tarefas: atividadesStorage().tarefas,
            inside: gerenciamentoStorage().inside,
            hash: gerenciamentoStorage().hash,
            tags: tagsStorage().tags,
            week: gerenciamentoStorage().week,
            pomodoro: pomodoroStorage().pomodoro
        }
    });

    const counter = {
        dados: state.dados,
        dispatch: {
            ...atividadesStorage(setState).dispatch,
            ...gerenciamentoStorage(setState).dispatch,
            ...tagsStorage(setState).dispatch,
            ...pomodoroStorage(setState).dispatch
        }
    }

    onMount(() => {
        console.log('geting tags')
        const saved = JSON.parse(window.localStorage.getItem('tags'))
        const tags_disciplinas = state.dados.disciplinas.map(item => ({ title: item.tag.title, color: item.tag.color, id: item.id, deletable: false }))
        if (saved) {
            counter.dispatch.setTag(saved)
        }
        else {
            counter.dispatch.setTag({
                primary: [...state.dados.tags.primary, ...tags_disciplinas],
                secondary: [...state.dados.tags.secondary, ...tags_disciplinas]
            })
        }
        let disciplinas = window.localStorage.getItem('disciplinas')
        if (disciplinas) counter.dispatch.setTarefas(JSON.parse(disciplinas))
    })

    return (
        <CounterContext.Provider value={counter}>
            {props.children}
        </CounterContext.Provider>
    );
}

export const horarios = [
    '- 6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:30', '19:20',
    '20:30', '21:20', '22:10', '23:00 +'
];

export const dias = [
    "dom", "seg", "ter", "qua", "qui", "sex", "sab"
];

export const semanas = [
    'semana1', 'semana2', 'semana3', 'semana4', 'semana5', 'semana6', 'semana7', 'semana8',
    'semana9', 'semana10', 'semana11', 'semana12', 'semana13', 'semana14', 'semana15', 'semana16', 'semana17'
]
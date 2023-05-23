import { createContext, createEffect, onMount, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { atividadesStorage } from "./atividades";
import { disciplinasStorage } from "./disciplinas";
import { gerenciamentoStorage } from "./gerenciamento";
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
        }
    });
    const counter = {
        dados: state.dados,
        dispatch: {
            ...atividadesStorage(setState).dispatch,
            ...gerenciamentoStorage(setState).dispatch,
            ...tagsStorage(setState).dispatch,
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
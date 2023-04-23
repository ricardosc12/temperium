import { createContext, useContext } from "solid-js";
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

    return (
        <CounterContext.Provider value={counter}>
            {props.children}
        </CounterContext.Provider>
    );
}
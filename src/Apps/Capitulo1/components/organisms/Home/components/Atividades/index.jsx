import style from './style.module.css'
import {
    createDraggable,
} from "@thisbeyond/solid-dnd";

const Draggable = ({id,children}) => {
    const draggable = createDraggable(id);
    return (
        <div use:draggable className={`
        cursor-pointer
        ${draggable.isActiveDraggable?'opacity-75 border-green':''}`}>
            {children}
        </div>
    );
};

export default function Atividades(){
    return (
        <div className={style.atividades} id="atividades">
            <h2 className='m-3 ml-5 mb-6 text-icons-header-hover tracking-wider'>Atividades</h2>
            <div className={style.atividades_list}>
                <Draggable id={'po'}><div><p>
                    Programação Orientada a Objetos
                    </p></div></Draggable>
                <Draggable id={'oc'}><div><p>
                    Organização Computacional
                    </p></div></Draggable>
                <Draggable id={'bd'}><div><p>
                    Banco de Dados
                    </p></div></Draggable>
                <Draggable id={'meta'}><div><p>
                    Meta-Heurística
                    </p></div></Draggable>
                <Draggable id={'comp'}><div><p>
                    Compiladores
                    </p></div></Draggable>
            </div>
        </div>
    )
}
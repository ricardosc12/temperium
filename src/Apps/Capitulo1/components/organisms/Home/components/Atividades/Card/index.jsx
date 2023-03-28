import {
    createDraggable,
} from "@thisbeyond/solid-dnd";
import style from './style.module.css'
import { ArrowIcon, IconGrab, IconRead, IconWorkSpace } from "@/Apps/Capitulo1/assets/Icons";

const Draggable = ({id,children,title}) => {
    const draggable = createDraggable(id,{title});

    return (
        <div use:draggable className={`
        cursor-pointer
        ${draggable.isActiveDraggable?'opacity-75 border-green':''}`}
        >
            {children}
        </div>
    );
};

const Atividade=({id, title, children, icon, label})=>{
    return (
        <Draggable id={id} title={label + " - " + title}>
            <div className="w-full flex flex-row items-center mb-5">
                <div className={style.icon_grab}><IconGrab/></div>
                <div>
                    <div className="flex items-center justify-between w-full">
                        <h5>{title}</h5>
                        <div>{icon}</div>
                    </div>
                    <p>{children}</p>
                </div>
            </div>
        </Draggable>
    )
}

export function CardAtividade({id, label}){
    return (
        <div>
            <div className={style.card_atividade}>
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-sm">{label}</h2>
                    <div className={style.icon_card_atividade}>
                        <ArrowIcon/>
                    </div>
                </div>
                <h5>Relembrandos conceitos - Sistemas Operacionais.</h5>
                <div className={style.divisor}></div>
                <div className={style.main_atividades}>
                    <Atividade id={'comp_sm1_atv1'} title="Estudo" label={label} icon={<IconRead/>}>
                        Estudos relacionas ao conteúdo abordado na semana primeira de compiladores.
                    </Atividade>
                    <Atividade id={'comp_sm1_atv2'} title="Trabalho Prático" label={label} icon={<IconWorkSpace/>}>
                        Leitura, pesquisas e atividades referentes a conclusão do trabalho prático.
                    </Atividade>
                </div>
            </div>
        </div>
    )
}
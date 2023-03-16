import style from './style.module.css'
import { AtividadeIcon } from '@/Apps/Capitulo1/assets/Icons';
import { CardAtividade } from './Card';

export default function Atividades(){
    return (
        <div className={style.atividades} id="atividades">
            <div className='m-3 ml-5 mb-6 flex-row flex justify-between'>
                <h2 className='eve-md'>Disciplinas</h2>
                <div className='flex justify-center items-center bg-black-destaq p-1 rounded-md'>
                    <AtividadeIcon/>
                </div>
            </div>
            <div className={style.atividades_list}>
                <CardAtividade id={'comp'} label={'Compiladores'}/>
                {/* <Draggable id={'po'}><div><p>
                    Programação Orientada a Objetos
                    </p></div></Draggable> */}
                {/* <Draggable id={'oc'}><div><p>
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
                    </p></div></Draggable> */}
            </div>
        </div>
    )
}
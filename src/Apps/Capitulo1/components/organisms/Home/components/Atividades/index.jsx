import style from './style.module.css'

export default function Atividades(){
    return (
        <div className={style.atividades} id="atividades">
            <h2 className='m-3 ml-5 mb-6 text-icons-header-hover tracking-wider'>Atividades</h2>
            <div className={style.atividades_list}>
                <div><p>Programação Orientada a Objetos</p></div>
                <div><p>Organização Computacional</p></div>
                <div><p>Banco de Dados</p></div>
                <div><p>Meta-Heurística</p></div>
                <div><p>Compiladores</p></div>
            </div>
        </div>
    )
}
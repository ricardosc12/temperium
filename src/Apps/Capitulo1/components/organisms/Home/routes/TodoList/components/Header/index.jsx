import style from './style.module.css'

export default function HeaderTodo(props) {


    return (
        <div className={style.root_header_todo}>
            <h2 className='color-black-fundo mr-5'>Gestão: </h2>
            <div className='flex space-x-5'>
                <h3 onClick={() => props.setMode('byweek')}
                    className={`color-black-fundo ${props.mode() == 'byweek' ? 'font-bold' : ''}`}>
                    Semanal
                </h3>
                <h3 onClick={() => props.setMode('byday')}
                    className={`color-black-fundo ${props.mode() == 'byday' ? 'font-bold' : ''}`}>
                    Diária
                </h3>
            </div>
        </div>
    )
}
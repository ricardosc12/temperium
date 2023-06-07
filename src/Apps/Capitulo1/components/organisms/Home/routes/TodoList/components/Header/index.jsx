import style from './style.module.css'

export default function HeaderTodo(props) {


    return (
        <div className={style.root_header_todo}>
            <h2 className='color-black-fundo mr-5'>Board</h2>
            <div className={'flex space-x-5'}>
                <span onClick={() => props.setMode('byweek')}
                    className={`${style.bymode} ${props.mode() == 'byweek' ? 'active' : ''}`}>
                    Semanal
                </span>
                <span onClick={() => props.setMode('byday')}
                    className={`${style.bymode} ${props.mode() == 'byday' ? 'active' : ''}`}>
                    Diária
                </span>
            </div>
        </div>
    )
}
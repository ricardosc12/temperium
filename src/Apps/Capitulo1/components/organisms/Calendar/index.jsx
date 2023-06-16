import { For } from 'solid-js';
import style from './style.module.css'

export default function CalendarPage(){

    const lines = 16;
    const col = 7;

    return (
        <div className='flex items-center justify-center w-full framer'>
             <table className={style.root_table}>
                <tbody>
                    <For each={Array(lines)}>
                        {(_,line)=>(
                            <tr>
                                <For each={Array(col)}>
                                    {(_,col)=>(
                                        <td>
                                            {(col()==4&&line()==3)?(
                                                <>
                                                <h3 className='color-black-fundo'>Teste</h3>
                                                <h3 className='color-black-fundo'>Teste</h3>
                                                <h3 className='color-black-fundo'>Teste</h3>
                                                <h3 className='color-black-fundo'>Teste</h3>
                                                </>
                                            ):''}
                                        </td>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    )
}
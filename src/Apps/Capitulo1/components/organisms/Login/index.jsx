import { createModal } from '@/Apps/Capitulo1/components/molecules/Modal';
import style from './style.module.css'
import Header from '../../molecules/Header';
import ModalSign from './Modal';
import { createSignal, on, createEffect } from 'solid-js';

// const ModalSignin=()=>{

//     const { auth, setAuthStorage } = useAuth()

//     function get(){

//         console.log(getLogin())
//     }

//     function callback(e){
//         const responsePayload = parseJwt(e.credential);
//         const data_login = {
//             nome: responsePayload.name,
//             email: responsePayload.email,
//             image: responsePayload.picture
//         }
//         secureLocalStorage.setItem('@id',data_login)
//         setAuthStorage(prev=>({...prev, user: data_login}))
//     }

//     function sign(){

//         google.accounts.id.initialize({
//             client_id: '1056413810692-eoq4oklo337jq5vrcbk8h42ng52odhml.apps.googleusercontent.com',
//             callback: callback
//         });

//         google.accounts.id.prompt();

//     }

//     return (
//         <div className='flex flex-col'>
//             <button className='my-5' onClick={sign}>Sign</button>
//             <button className='my-5' onClick={get}>GET</button>
//         </div>


//     )
// }

export default function LoginPage(){

    const { open:open, close:close, state } = createModal(<ModalSign/>)

    open()

    return (
        <div className='flex w-full h-full justify-center items-center absolute flex-col'>
            <div className={style.header}>
                <Header/>
            </div>
            <div className={style.content}>
                <button onClick={open} className='btn-base'>
                    <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M10 11H2.05c.5-5.053 4.764-9 9.95-9c5.523 0 10 4.477 10 10s-4.477 10-10 10c-5.185 0-9.449-3.947-9.95-9H10v3l5-4l-5-4v3z"/></svg>
                    <p>Logar</p>
                </button>
            </div>
                
            {state()?<div className={style.blur}></div>:''}
        </div>
    )
}
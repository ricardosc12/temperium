import { parseJwt } from '@/utils/decrypt';
import { secureLocalStorage } from '@/utils/secureLocalStorage';
import { useAuth } from '@/storage/Auth';
import getLogin from '@/utils/validateLogin';
import style from './style.module.css'
import { HeaderModal } from '../../../molecules/Modal';

export default function ModalSign(){

    const { setAuthStorage } = useAuth()

    function callback(e){
        const responsePayload = parseJwt(e.credential);
        const data_login = {
            nome: responsePayload.name,
            email: responsePayload.email,
            image: responsePayload.picture
        }
        secureLocalStorage.setItem('@id',data_login)
        setAuthStorage(prev=>({...prev, user: data_login}))
    }

    function sign(){

        google.accounts.id.initialize({
            client_id: '1056413810692-eoq4oklo337jq5vrcbk8h42ng52odhml.apps.googleusercontent.com',
            callback: callback
        });

        google.accounts.id.prompt();

    }

    return (
        <div className={style.modal_login}>
            <HeaderModal title={"Termo de consentimento"}/>
            <div className='px-2 overflow-y-scroll'>
                <h5 className='color-text-secondary'>Temperium - Daniel Mendes / Ricardo Spínola</h5>
                <h5 className='color-text-secondary'>Universidade Federal de Viçosa - Campus Florestal</h5>
                <div className='mt-5'>
                    <h3>1. Introdução</h3>
                    <h4 className='color-text-secondary p-1 indent-4 text-justify'>
                        Temperium é uma aplicação desktop em desenvolvimento que tem como objetivo auxiliar estudantes na 
                        organização de suas tarefas acadêmicas de forma eficiente e automatizada. O propósito é torná-la uma ferramenta interativa e útil, capaz de gerenciar 
                        automaticamente as grades dos estudantes.
                    </h4>
                    <h4 className='color-text-secondary p-1 indent-4 text-justify'>
                        Além disso, a ferramenta possibilitará criar tarefas que podem ser usadas como organização pessoal, ou atividades extracurriculares existentes.
                    </h4>
                </div>
                <div className='mt-5'>
                    <h3>2. Objetivo</h3>
                    <h4 className='color-text-secondary p-1 indent-4 text-justify'>
                        Com o objetivo de construir uma ferramenta que atenda às necessidades dos estudantes, optamos por utilizar uma abordagem de design participativo. 
                        Dessa forma, entregaremos uma ferramenta que esteja o mais próximo possível das demandas existentes.
                    </h4>
                    <h4 className='color-text-secondary p-1 indent-4 text-justify'>
                        Sendo assim, nesta etapa, é de grande importância apresentarmos as primeiras ideias de Temperium e iniciar uma pesquisa que visa compreender as necessidades e 
                        desafios enfrentados pelos estudantes na gestão de seu tempo e tarefas acadêmicas. Através dessa pesquisa, poderemos identificar as principais demandas e 
                        dificuldades dos estudantes na organização de seu tempo. 
                    </h4>
                    <h5 className='color-text-secondary p-1 indent-4 text-justify mt-1'>
                        <i>Você pode optar em participar mas não responder as perguntas, fique a vontade para apenas conhecer a ferramenta e dar seu feedback.</i> 😁
                    </h5>

                    <div className='w-full flex flex-col justify-center items-center mt-5'>
                        <h3>Entre com sua conta universitária para participar.</h3>
                        <button className='btn-base bg-black-dark pl-0 py-0 mt-5 h-7' onClick={sign}>
                            <div className='bg-text-primary rounded-sm p-1 rounded-r-none mr-2'>
                                <svg width="17" height="17" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                            </div>
                            <p className='text-sm'>Entrar com google</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { getUser } from "@/api/user"
import { useAuth } from "@/storage/Auth"
import { secureLocalStorage } from "@/utils/secureLocalStorage"
import { invoke } from '@tauri-apps/api/tauri'

export default function AuthPage(){

    const { auth, setAuthStorage } = useAuth()

    function logout(){
        secureLocalStorage.removeItem('@id')
        setAuthStorage(prev=>({...prev, user:undefined}))
    }

    async function get(){
        const resp = await getUser({id: 'lucao'})
        console.log(resp)
    }

    async function save(){
        const obj = {
            atividades:{
                comp:[
                    'tp1','tp2'
                ]
            }
        }
        invoke('save',{name:JSON.stringify(obj)})
    }

    return (
        <div className='flex flex-col w-full h-full justify-center items-center framer'>
            <h3 className="color-black-destaq">Nome: {auth()?.user?.nome}</h3>
            <h3 className="color-black-destaq">Email: {auth()?.user?.email}</h3>
            <div className="mt-5 w-20 rounded-full overflow-hidden">
                <img referrerpolicy="no-referrer" src={auth()?.user?.image} alt="" />
            </div>
            <button className="mt-5 px-10 py-1 bg-black-fundo color-text-primary 
                rounded-md hover:bg-black-destaq text-sm"
                onClick={logout}
            >
                    SAIR
            </button>
            <button onClick={get}>getUser</button>

            <div className="mt-5">
                <button onClick={save} className="btn-base">Save</button>
            </div>

        </div>
    )
}
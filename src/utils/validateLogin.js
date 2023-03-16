import { secureLocalStorage } from "./secureLocalStorage"
import { validateEmail } from "./validate"

export default function getLogin(){
    try {
        const { email, nome, image } = secureLocalStorage.getItem('@id')

        if(!validateEmail(email)) throw 'error'

        return { email, nome, image }
        
    }
    catch{
        return false
    }
}


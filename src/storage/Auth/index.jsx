import { createSignal, createContext, useContext } from "solid-js";

const AuthContext = createContext();

export function AuthProvider(props) {

    const [auth, setAuthStorage] = createSignal({}),

    auth_state = {
        auth,
        setAuthStorage
    }

    return (
        <AuthContext.Provider value={auth_state}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() { return useContext(AuthContext); }
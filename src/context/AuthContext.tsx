import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";
interface TokenState {
    token: string;
}
interface AuthContextState {
    token: TokenState;
    signIn({ email, password }: UserData): Promise<void>;
    userLooged(): boolean;
}
interface UserData {
    email: string;
    password: string;
}
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<TokenState>({} as TokenState);

    const signIn = useCallback(async ({ email, password }: UserData) => {
        console.log(email, password)
        try {
            const response = await api.post('/usuarios/login', {
                email,
                password
            })
            const { token, useReturns } = response.data;
            setToken(token)
            await AsyncStorage.setItem('@turbofit:token', token);
            await AsyncStorage.setItem('@turbofit:aluno', useReturns.id);
            await AsyncStorage.setItem('@turbofit:dados', useReturns.dadosId);
            await AsyncStorage.setItem('@turbofit:userId', useReturns.usuarioId);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (e) {
            console.log(e)
        }
    }, [])

    const userLooged = useCallback(() => {
        const token = localStorage.getItem('@turbofit:token');
        return token ? true : false
    }, [])
    return (
        <AuthContext.Provider value={{
            token,
            signIn,
            userLooged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context

}
export { useAuth, AuthProvider }
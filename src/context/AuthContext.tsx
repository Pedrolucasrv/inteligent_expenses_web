'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from "react";


import axios from "axios";
import {api} from "../services/_api";
import { toast } from "react-toastify";

type User = {
    token:string
} | null

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    register?: (cpf_cnpj: string, password: string) => Promise<any>;
    login?: (email: string , password: string ) => Promise<any>;
    logout?: () => Promise<any>;
    changeAccount?: (user:User, account: any)=> void,
    user?: any
    // {
    //     id: string | null,
    //     uuid: string | null,
    //     relationship: string | null,
    //     account: string | null,
    //     client: string | null,
    //     account_number: string | null,
    //     agency_number: string | null,
    //     first_name: string | null,
    //     full_name: string | null,
    //     email:string | null,
    //     phone: string | null,
    // }
}

const TOKEN_KEY = 'jwt';
export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}: any) => {


    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: true
    })
    const [user, setUser] = useState<User>(null)

    useEffect(() => {



        const loadAuth = async () =>{

            
            const token = window.localStorage.getItem('Authorization')
            
            if (token) {
                setAuthState({
                    token: token,
                    authenticated: true,
                })
            }
        }
        loadAuth()
    }, [])

    const register = async (cpf_cnpj: string, password: string) =>{
        try {
            return await api.post(`auth/register`,{cpf_cnpj, password})
        }catch(e){
            return {error: true, msg: (e as any).response.data.msg}
        }
    };

    const getUser = () =>{
        return(user)
    }

    const changeAccount = (e:User, account: any) => {

        const { user_relationship_uuid, account_uuid, user_uuid, register_uuid  } = account;

        setUser(e)

    }   

    const router = useRouter()


    const login = async (email: string , password: string) =>{
        try {
            return api.post('auth/login', {email: email, password: password}).then((res)=>{
                toast(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                
                setAuthState({authenticated:true, token: res.data.token})
                window.localStorage.setItem('Authorization', `Bearer ${authState.token}`)
                
                router.push('/dashboard')

            }).catch((err)=>{
                toast(err.response.data.message);   
            })
            
        }catch(e:any){
        
        }
    };

    const logout = async () =>{
        await api.delete(`/deauthenticate`).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
        await window.localStorage.removeItem(TOKEN_KEY);
        api.defaults.headers.common['Authorization'] = '';


        setAuthState({
            token: null,
            authenticated: false
        })

        setUser(null)
    };


    return <AuthContext.Provider value={{user, authState, register, login,logout, changeAccount: changeAccount}}>{children}</AuthContext.Provider>
}
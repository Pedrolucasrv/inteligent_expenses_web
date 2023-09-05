import { Button } from "@/components/Buttons"
import { Input } from "@/components/Input"
import { useAuth } from "@/context/AuthContext"
import useFetch from "@/hooks/useFetch"
import { api } from "@/services/_api"
import axios from 'axios'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { ToastContainer } from 'react-toastify';

type userData = {
    email?: string | null,
    name?:string | null,
    password?:string | null
}

type Props = {
    onBack: ()=>void,
    onRegisterComplete: ()=>void
}

export const Register = (props:Props) => {

    const [registerLoading, setRegisterLoading] = useState<boolean>(false)
    const [data, setData] = useState<userData>({
        email: null,
        name:null,
        password:null
    })


    const handleSubmit = (e: any) => {
        e.preventDefault()
        

        setRegisterLoading(true)
        api.post('auth/register', data).then((res => {
            toast(res.data.message);

            res.data.message == 'Usuario criado com sucesso!' ? props.onRegisterComplete() : ''
        })).catch((err)=> {
            toast(err.response.data.message);
        }).finally(()=>{
            setRegisterLoading(false)
        })
    }   

    return(

        <>
        
        <form  onSubmit={(e)=> handleSubmit(e)}>
            <a className="border-b-[1.5px] hover:cursor-pointer border-white" type="button" onClick={(e)=> props.onBack()}>{'<-'} Voltar</a>
            <div className="mt-5">
                <h5 className="mb-1">Email</h5>
                <Input required onChange={(e)=> {setData({...data, email: e.target.value})}} className="h-[55px] px-3 text-black w-full rounded-md bg-zinc-300"  type="email" />
            </div>
            <div className="mt-2">
                <h5 className="mb-1">Nome</h5>
                <Input required onChange={(e)=> {setData({...data, name: e.target.value})}} className="h-[55px] px-3 text-black w-full rounded-md bg-zinc-300"  type="text" />
            </div>
            <div className="mt-2">
                <h5 className="mb-1">Senha</h5>
                <Input required onChange={(e)=> {setData({...data, password: e.target.value})}} className="h-[55px] px-3 text-black w-full rounded-md bg-zinc-300"  type="password" />
            </div>
            <div>
                <Button  loading={registerLoading} type='submit'>Cadastrar-se</Button>

                {/* <button  className="hover:-translate-y-1 transition-all bg-blue-700 w-full mt-5 py-3 rounded-md">Enviar</button> */}
            </div>
        </form>
        
    </>
        )
}
import { Button } from '@/components/Buttons'
import { Input } from '@/components/Input'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/services/_api'
import { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    onRegister: ()=>void
}



export const Login = (props: Props) =>{

    const { login } = useAuth()


   
    const [ loginLoading, setLoginLoading ] = useState<boolean>(false)
    const [ credentials, setCredentials ] = useState<{email:string , password: string }>({email:'', password: ''})


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoginLoading(true)
        if(login){
            await login(credentials.email, credentials.password).finally(()=>{
            })
        }
        setLoginLoading(false)



    }


    return(
        <>
            {JSON.stringify(credentials)}
            <form action="" onSubmit={(e)=>handleSubmit(e)}>

                <div className="mt-2">
                    <h5 className="mb-1">Nome</h5>
                    <Input onChange={(e)=> setCredentials({...credentials , email: e.target.value})} className="h-[55px] w-full rounded-md bg-zinc-300" type="text" />
                </div>
                <div className="mt-2">
                    <h5 className="mb-1">Senha</h5>
                    <Input onChange={(e)=> setCredentials({...credentials ,password: e.target.value})} className="h-[55px] w-full rounded-md bg-zinc-300" type="password" />
                </div>
                <div>
                    <Button loading={loginLoading} type='submit'>Entrar</Button>
                    {/* <button type='submit' className=" bg-blue-700 w-full mt-5 py-3 rounded-md">Enviar</button> */}
                </div>
                <div className='text-center flex mt-3'>
                    <span className='flex-1'>Esqueceu a senha?</span>
                    <span>|</span>
                    <button  type="button" onClick={()=>props.onRegister()} className='flex-1'>Registrar-se</button>
                </div>
            </form>
        </>
    )
}
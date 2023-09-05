'use client'

import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"



export function ProtectedRoutes(props: {children: React.ReactNode}){
    const { authState } = useAuth() 

    useEffect(()=>{console.log(authState)},[])
    return(
        <>  
            {
                authState?.authenticated ? 
                <>{authState.token}</>
                :
                <>Não autenticado</>
            }
        </>
    )
}
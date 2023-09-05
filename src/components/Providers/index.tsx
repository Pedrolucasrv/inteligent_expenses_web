'use client'

import { AuthProvider, useAuth } from "@/context/AuthContext";

type Props = {
    children: React.ReactNode
}

export function Providers(props: Props){
    return(
        <AuthProvider>
            {props.children}
        </AuthProvider>
    )
}
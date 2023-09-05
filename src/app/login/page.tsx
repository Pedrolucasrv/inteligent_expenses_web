'use client'

import styles from './styles.module.css';
import {useState} from 'react';
import {Login} from './components/Login/';
import {Register} from './components/Register/';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import logo from '../../assets/images/logo.png'


export default function page () {
    
    const [register, setRegister] = useState<boolean>(false)

    return(
        <>
        <div className={`w-full grid-cols-12  items-center justify-center min-h-screen grid ${styles.mainBg}`}>
            <div className='col-span-12 md:col-span-5 lg:col-span-4'>

                <div className="border-zinc-600 flex items-center bg-stone-900 h-screen rounded-none w-full border-[1.5px] p-5 rounded-lg">
                    <div className='w-full'>
                        <Image className='mb-10' src={logo} alt=''></Image>
                        {
                            register ? <Register onRegisterComplete={()=> setRegister(false)} onBack={()=> setRegister(false)}/> : <Login onRegister={()=>setRegister(true)}/>
                        }
                    </div>
                </div>
            </div>
            <div className="hidden md:block md:col-span-7 lg:col-span-8"></div>
        </div>
                    </>
    )
}




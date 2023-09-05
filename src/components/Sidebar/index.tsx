'use client'

import { useRouter } from "next/navigation";
import { House, ChartPieSlice } from "phosphor-react";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'

export function Sidebar(){

    const router = useRouter()
    const path = usePathname();
    const [activeMenu, setActiveMenu] = useState("");

    const menuItems = [
        {
        path: "/dashboard",
        active: "Dashboard",
        icon: <House size={20} color="black"/>,
        },
        {
        path: "/dashboard/stats",
        active: "Estatisticas",
        icon: <ChartPieSlice size={20} color="black"/>,
        },
      ];
      
      useEffect(()=>{
          menuItems.forEach((item) => {
              if (path === item.path) {
                  setActiveMenu(item.active);
                }
            });
        },[path])

    return(
        <div className="max-w-[250px] w-full px-2 bg-stone-900 h-screen py-10">
            <div className="flex gap-2 items-end">
                <div className="bg-stone-600 h-14 w-14"></div>
                <p className="font-semibold">Pedro Lucas</p>
            </div>
            <div className="border-[1px] border-stone-600 my-7"></div>
            {menuItems.map((item) => (
                    <div key={item.path} onClick={() =>{router.push(item.path)}} className={`${activeMenu == item.active ? 'translate-x-2  rounded-r-none' : 'opacity-50' } flex cursor-pointer items-center px-4 py-3 rounded-md my-2 bg-main hover:opacity-100 transition-all `}>
                        <div className=" flex items-center w-8 h-8">
                            {item.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-black">{item.active}</p>
                        </div>
                    </div>
            ))}
        </div>
    )
}
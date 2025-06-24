"use client"

import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import SplashScreen from "./splash-screen"

export default function SplashWrapper({children}: {children: React.ReactNode}) {
    const [showSplash, setShowSplash] = useState(true)


    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowSplash(false)
        }, 7000)
        return () => clearTimeout(timer)
    }, [])

    if(showSplash){
        return (
            <div>
                <SplashScreen />
            </div>
        )
    }


    return (
        <div className="bg-[#dfd2c6] min-h-screen">
            {children}
            <Toaster />
        </div>
    )
}
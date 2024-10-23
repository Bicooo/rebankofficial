'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'



export default function Welcome() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
        authenticateUser()
    }, [])

    const checkAuth = async () => {
        const response = await fetch('/api/session')
        if (response.ok) {
            setIsAuthenticated(true)
        }
    }

    const authenticateUser = async () => {
        const WebApp = (await import('@twa-dev/sdk')).default
        WebApp.ready()
        WebApp.expand()
        const initData = WebApp.initData
        if (initData) {
            try {
                const response = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ initData }),
                })

                if (response.ok) {
                    setIsAuthenticated(true)
                    router.refresh()
                } else {
                    console.error('Authentication failed')
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Error during authentication:', error)
                setIsAuthenticated(false)
            }
        }
    }

    return (
        <div className="flex flex-col justify-between items-center relative h-[100vh] min-h-[612px] bg-gradient-to-b from-[#B05BDA] to-[#D3A5EA] isolation-isolate overflow-hidden">
            <div className="flex flex-col items-center w-full mt-8">
                <div className="w-[80%]">
                    <h1 className="text-white font-bold text-[32px] leading-[36px] tracking-tight md:text-[40px] md:leading-[44px]">
                        Welcome to ReBank!
                    </h1>
                    <p className="text-white text-opacity-60 font-medium text-[12px] leading-[14px] mt-2 md:text-[14px] md:leading-[16px]">
                        Your free bank account on Telegram.
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center w-full h-[455.47px]">
                <img src="/homepage-card.png" alt="Background Design" className="w-full" />
            </div>

            <div className="flex justify-center items-center w-full mb-8">
                <button onClick={isAuthenticated ? () => router.push('/country') : authenticateUser} className="flex justify-center items-center p-4 w-[80%] h-[50px] bg-black rounded-full md:h-[60px]">
                    <span className="text-white font-medium text-[14px] leading-[20px] tracking-tight md:text-[16px] md:leading-[24px]">Sign Up</span>
                </button>
            </div>
        </div>
    );
}

"use client"
import { redirect } from "next/navigation"
import { FormEvent } from "react";


export default async function Logout(){

    async function logout(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const res = await fetch("/logout/api/",{
            method:"POST",
            cache:"no-cache",
        })

        if (res.status/100 == 2){
            redirect("/login")
        }
    }

    const user_response = await fetch("/logout/user",{
        method:"GET",
        cache:"no-cache",
    })

    const user = await user_response.json()
    console.log(user)

    return (
        <div className="w-full h-fit p-4">
            {
                user &&
                <button className="text-right text-red-800 border border-black p-2 rounded-md hover:bg-red-800 hover:text-white " onClick={logout}>
                    Logout
                </button>
            }
            

        </div>
        
    )
}
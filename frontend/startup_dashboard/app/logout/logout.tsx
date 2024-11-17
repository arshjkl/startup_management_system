"use client"
import { redirect } from "next/navigation"
import { FormEvent,use,useEffect, useState } from "react";


export default async function Logout({user}:any){

    async function logout(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const res = await fetch("/logout/api/",{
            method:"POST",
            cache:"no-cache",
        })

        if (res.status/100 == 2){
            window.location.reload()
            redirect("/login")
        }
    }
    console.log(user)
    return (
        <div className="w-full h-fit p-4">
            {
                user &&
                <div className="w-full flex flex-row justify-between">
                    <div className="text-2xl">
                        Hello! {user.name}
                    </div>
                    <button className="text-right text-red-800 border border-black p-2 rounded-md hover:bg-red-800 hover:text-white " onClick={logout}>
                        Logout
                    </button>
                </div>
            }
            

        </div>
        
    )
}
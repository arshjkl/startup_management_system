import { redirect } from "next/navigation"


export default function Login() {

    async function login(formdata:FormData){
        'use server'
        const res = await fetch("http://127.0.0.1:8000/users/login/",{
            "method":"POST",
            "body":formdata
        })
        
        if (res.status/100 == 2){
            let data = await res.json()
            console.log(data)
            if(data.get("user_type") == "student"){
                redirect("/student")
            }
            else if(data.get("user_type") == "founder"){
                redirect("/founder")
            }

        }
    }

    return (
        <div className="w-full h-fit pt-10">
            <form className="w-1/3 mx-auto border border-black rounded-lg h-full p-2 flex flex-col gap-3 items-center" action={login}>
                <p className="text-lg font-bold mx-auto text-center">Please login yourself</p>
                <input type="text" name="email" placeholder="Email" className="w-full border border-black rounded-md p-1"/>
                <input type="password" name="password" placeholder="Password" className="w-full border border-black rounded-md p-1"/>
                <div className="flex flex-row gap-2 w-full justify-between px-3">
                </div>
                <input type="submit" className="text-center w-fit px-2 bg-gray-300 text-blue-500 hover:cursor-pointer hover:shadow-md " value="login"/>
            </form>
            <div className="w-fit mx-auto border border-black rounded-lg h-full p-2 flex flex-row gap-2 items-center">
                <p>Don't have an account? Please </p>
                <a href="/register" className="underline text-blue hover:font-bold">register</a>
            </div>
        </div>
        
    );
}
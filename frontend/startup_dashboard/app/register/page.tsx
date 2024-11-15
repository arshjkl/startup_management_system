import { redirect } from "next/navigation"


export default function Register() {

    async function register(formdata:FormData){
        'use server'
        console.log(formdata)
        const res = await fetch("http://127.0.0.1:8000/users/register/",{
            "method":"POST",
            "body":formdata
        })
        
        if (res.status/100 == 2){
            redirect(`/${formdata.get("type")}`)
        }
    }

    return (
        <div className="w-full h-fit pt-10">
            <form className="w-1/3 mx-auto border border-black rounded-lg h-fit p-2 flex flex-col gap-3 items-center" action={register}>
                <p className="text-lg font-bold mx-auto text-center">Please register yourself</p>
                <input type="text" name="name" placeholder="Name" className="w-full border border-black rounded-md p-1" required={true}/>
                <input type="text" name="email" placeholder="Email" className="w-full border border-black rounded-md p-1" required={true}/>
                <input type="password" name="password" placeholder="Password" className="w-full border border-black rounded-md p-1" required={true}/>
                <div className="flex flex-row gap-2 w-full justify-between px-3">
                    <div>
                        <input type="radio" id="founder" name="type" value="founder" defaultChecked={true}/>
                        <label htmlFor="founder">Student</label>
                    </div>
                    <div>
                        <input type="radio" id="student" name="type" value="student"/>
                        <label htmlFor="student">Founder</label>
                    </div>
                </div>
                <input type="submit" className="text-center w-fit px-2 bg-gray-300 text-blue-500 hover:cursor-pointer hover:shadow-md " value="Submit"/>
            </form>
            <div className="w-fit mx-auto border border-black rounded-lg h-fit p-2 flex flex-row gap-2 items-center">
                <p>Already have an account? Please </p>
                <a href="/login" className="underline text-blue hover:font-bold">login</a>
            </div>
        </div>
    )
}
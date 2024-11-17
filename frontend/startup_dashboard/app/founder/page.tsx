import { redirect } from "next/navigation";
import { fetchApiAuth } from "../utils/api";


function StartupAdditionForm(){

    async function addStartup(formdata:FormData){
        'use server'
        let investor_data = String(formdata.get("investors"))
        let investors:string[] = []
        if (investor_data){
            let investors = investor_data.split(",")
        }
        const res = await fetchApiAuth("startups/create/",{
            "method":"POST",
            "cache":"no-cache",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            "body":JSON.stringify({
                "name":formdata.get("name"),
                "description":formdata.get("description"),
                "founding_date":formdata.get("founded_date"),
                "domain":formdata.get("domain"),
                "valuation":formdata.get("valuation"),
                "investors":investors
            })
        })

        console.log(await res.json())
        
        if (res.status/100 == 2){
            location.reload()
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full text-2xl">
                Add a new startup
            </div>
            <form className="w-full flex flex-col gap-2" action={addStartup}>
                <input type="text" placeholder="Startup Name" name="name" className="w-full border border-black p-1 rounded-md"/>
                <input type="text" placeholder="Startup Description" name="description" className="w-full border border-black p-1 rounded-md"/>
                <input type="date" placeholder="Startup Founded Date" name="founded_date" className="w-full border border-black p-1 rounded-md"/>
                <input type="text" placeholder="Domain" name="domain" className="w-full border border-black p-1 rounded-md"/>
                <input type="number" placeholder="Valuation" name="valuation" className="w-full border border-black p-1 rounded-md"/>
                <input type="text" placeholder="Investors (Comma seperated)" name="investors" className="w-full border border-black p-1 rounded-md"/>
                <input type="submit" value="Add Startup" className="w-full bg-blue-500 text-white p-1 rounded-md hover:cursor-pointer hover:shadow-md"/>
            </form>
        </div>
    )
}


async function StartupList(){

    const res = await fetchApiAuth("startups/list/",{
        method:"GET",
        cache:"no-cache"
    })

    const startups = await res.json()
    
    return (
        <div className="w-full h-full flex flex-col gap-2 p-5">
            <div className="w-full text-2xl">
                Your Startups
            </div>
            <div className="w-full flex flex-col gap-2">
                {startups.map((startup:any) => {
                    return (
                        <a className="w-full border border-black p-2 rounded-md" href={`/founder/${startup.static_id}`}>
                            <div className="text-lg font-bold">{startup.name}</div>
                            <div className="text-sm">{startup.description}</div>
                            <div className="text-sm">Founded on: {startup.founding_date}</div>
                            <div className="text-sm">Domain: {startup.domain}</div>
                            <div className="text-sm">Valuation: {startup.valuation}</div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}




export default async function Page(){

    return (
        <div className="grid grid-cols-2 w-full">
            <div>
                <StartupList/>
            </div>
            <div className="p-4 ">
                <StartupAdditionForm/>
            </div>
        </div>
    );
}
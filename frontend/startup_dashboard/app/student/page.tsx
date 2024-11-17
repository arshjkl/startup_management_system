import { fetchApiAuth } from "../utils/api"

interface Startup {
    static_id: string
    name: string
    domain: string
    valuation: number
}

interface StartupCardProps {
    startup: Startup
}


function StartupCard({startup}:StartupCardProps) {
    return (
        <a className="rounded-lg border border-black p-2 text-md text-black flex flex-col hover:shadow-md hover:border-blue-400" href={`/student/${startup.static_id}`}>
            <p className="text-center font-bold">
                {startup.name}
            </p>
            <p>
                Domain: {startup.domain}
            </p>
            <p>
                Valuation: {startup.valuation}
            </p>
        </a>
    );
}

async function Startups(){
    const res = await fetchApiAuth("startups/list/",{
        method:"GET",
        cache:"no-cache"
    })

    const startups = await res.json()

    return (

        <div className="flex flex-col gap-6">
            <p className="font-bold text-center text-xl">
                Startups
            </p>
            <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3 h-full">
            
                {
                    startups.slice(0,9).map((startup)=><StartupCard startup={startup}></StartupCard>)
                }
                {
                    startups.length > 9 ? <a className="text-blue-600 hover:underline" href="/startups">View all</a> : <></>
                }
            </div>
        </div>

        
    );
}

interface Application {
    company: string
    job: string
    resume: string
}

interface ApplicationCardProps {
    application: Application
}


function ApplicationCard({application}:ApplicationCardProps) {
    return (
        <div className="rounded-lg border border-black p-2 text-md text-black flex flex-col">
            <p className="text-center font-bold">
                {application.company}
            </p>
            <div className="flex flex-row justify-between">
                <p>
                    Job: {application.job}
                </p>
                <a href={application.resume} target="_blank" className="text-blue-500 hover:underline">Resume</a>
            </div>
            
        </div>
    );
}

function Applications(){
    const applications:Application[] = [
        {
            company:"c1",
            job: "j1",
            resume: "https://google.com"
        },
        {
            company:"c2",
            job: "j2",
            resume: "https://google.com"

        },
        {
            company:"c1",
            job: "j1",
            resume: "https://google.com"
        },
        {
            company:"c2",
            job: "j2",
            resume: "https://google.com"

        },
        {
            company:"c1",
            job: "j1",
            resume: "https://google.com"
        },
        {
            company:"c2",
            job: "j2",
            resume: "https://google.com"

        },
        {
            company:"c1",
            job: "j1",
            resume: "https://google.com"
        },
        {
            company:"c2",
            job: "j2",
            resume: "https://google.com"

        },
        {
            company:"c1",
            job: "j1",
            resume: "https://google.com"
        },
        {
            company:"c2",
            job: "j2",
            resume: "https://google.com"

        }
    ]

    return (
        <div className="w-full flex flex-col gap-3 h-full ">
            <p className="font-bold text-center">
                Applications
            </p>
            <div className="overflow-y-scroll p-3 flex flex-col gap-2 border borcer-black">
                {
                    applications.map((application)=><ApplicationCard application={application}/>)
                }
            </div>
        </div>
    );
}

export default function Page(){
    return(
        <div className="flex flex-row w-full h-full">
            <div className="w-2/3 border border-r-indigo-400 p-4 h-full">
                <Startups/>
            </div>
            <div className="w-1/3 border border-r-indigo-400 p-4 h-full">
                <Applications/>
            </div>
        </div>
        
        
    );
}
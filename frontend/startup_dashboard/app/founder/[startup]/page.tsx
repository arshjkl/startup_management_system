// This page contains all the startup related details fetched using startup detail API
// using the static id passed in url param

import { fetchApiAuth } from "../../utils/api";
import { FcDeleteRow, } from "react-icons/fc";
import { MdDelete } from "react-icons/md";


interface StartupIDProps {
    startup:string
}

interface PathParams {
    params:StartupIDProps
}


async function AddEmployee({startup}:StartupIDProps){
    async function addEmployee(formdata:FormData){
        'use server'
        const res = await fetchApiAuth(`startups/employees/${startup}/`,{
            "method":"POST",
            "cache":"no-cache",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            "body":JSON.stringify({
                "name":formdata.get("name"),
                "designation":formdata.get("designation"),
                "salary":formdata.get("salary"),
                "joining_date":formdata.get("joining_date")
            })
        })

        if (res.status/100 == 2){
            location.reload()
        }
    }

    return (
        <div className="w-full border border-black p-2 rounded-md mt-4">
            <form className="w-full flex flex-col gap-2 items-center" action={addEmployee}>
                <input type="text" placeholder="Employee Name" name="name" className="w-full border border-black p-1 rounded-md"/>
                <input type="text" placeholder="Employee Designation" name="designation" className="w-full border border-black p-1 rounded-md"/>
                <input type="number" placeholder="Employee Salary" name="salary" className="w-full border border-black p-1 rounded-md"/>
                <input type="date" placeholder="Employee Joining Date" name="joining_date" className="w-full border border-black p-1 rounded-md"/>
                <input type="submit" value="Add Employee" className="w-fit p-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:shadow-md"/>
            </form>
        </div>
    )
}



async function Employees({startup}:StartupIDProps){
    const res = await fetchApiAuth(`startups/employees/${startup}`,{
        method:"GET",
        cache:"no-cache"
    })

    const employees = await res.json()

    async function deleteEmployee(formdata:FormData) {
        'use server'
        const res = await fetchApiAuth(`startups/employees/delete/${formdata.get("employee_id")}/`,{
            "method":"DELETE",
            "cache":"no-cache",
        })

        if (res.status/100 == 2){
            location.reload()
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-2 p-2">
            <div className="w-full text-2xl">
                Employees
            </div>
            <div className="w-full flex h-full flex-row gap-2 overflow-x-scroll">
                {
                    employees.map((employee:any)=>
                        <form className="w-fit border border-black p-2 rounded-md flex flex-col h-full justify-between text-nowrap" action={deleteEmployee}>
                            <input type="hidden" name="employee_id" value={employee.static_id}/>
                            <div className="text-lg font-bold">{employee.name}</div>
                            <div className="text-sm">{employee.designation}</div>
                            <div className="text-sm">{employee.salary}</div>
                            <div className=" flex flex-row w-full justify-between">
                                <div className="text-sm">{employee.joining_date}</div>
                                <button className="bg-red-500 text-white p-1 rounded-md hover:cursor-pointer hover:shadow-md"><MdDelete className="text-black bg-white border-none p-0 hover:shadow-md"/></button>
                            </div>
                        </form>
                    )
                }
            </div>
        </div>
    )
}

async function AddJob({startup}:StartupIDProps){
    async function addJob(formdata:FormData){
        'use server'
        const res = await fetchApiAuth(`startups/jobs/${startup}/`,{
            "method":"POST",
            "cache":"no-cache",
            "headers":{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            "body":JSON.stringify({
                "title":formdata.get("title"),
                "description":formdata.get("description"),
                "job_type":formdata.get("job_type")
            })
        })

        if (res.status/100 == 2){
            location.reload()
        }
    }

    return (
        <div className="w-full border border-black p-2 rounded-md mt-4">
            <form className="w-full flex flex-col gap-2 items-center" action={addJob}>
                <input type="text" placeholder="Job Title" name="title" className="w-full border border-black p-1 rounded-md"/>
                <textarea placeholder="Job Description" name="description" className="w-full border border-black p-1 rounded-md"/>
                <select name="job_type" className="w-full border border-black p-1 rounded-md">
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                </select>
                <input type="submit" value="Add Job" className="w-fit p-2 bg-blue-500 text-white rounded-md hover:cursor-pointer hover:shadow-md"/>
            </form>
        </div>
    )
}



async function Jobs({startup}:StartupIDProps){
    const res = await fetchApiAuth(`startups/jobs/${startup}`,{
        method:"GET",
        cache:"no-cache"
    })

    const jobs = await res.json()

    async function deleteEmployee(formdata:FormData) {
        'use server'
        const res = await fetchApiAuth(`startups/jobs/delete/${formdata.get("employee_id")}/`,{
            "method":"DELETE",
            "cache":"no-cache",
        })

        if (res.status/100 == 2){
            location.reload()
        }
    }

    return (
        <div className="w-full h-full flex flex-col gap-2 p-2">
            <div className="w-full text-2xl">
                Jobs
            </div>
            <div className="w-full flex h-full flex-row gap-2 overflow-x-scroll">
                {
                    jobs.map((job:any)=>
                        <form className="w-fit border border-black p-2 rounded-md flex flex-col h-full justify-between text-nowrap" action={deleteEmployee}>
                            <input type="hidden" name="employee_id" value={job.static_id}/>
                            <div className="text-lg font-bold">{job.title}</div>
                            <div className="text-sm">{job.job_type}</div>
                            <button className="bg-red-500 text-white p-1 w-fit rounded-md hover:cursor-pointer hover:shadow-md"><MdDelete className="text-black bg-white border-none p-0 w-fit hover:shadow-md"/></button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}


export default async function Page({params}:PathParams){

    const res = await fetchApiAuth(`startups/detail/${params.startup}`,{
        method:"GET",
        cache:"no-cache"
    })

    const startup = await res.json()

    return (
        <div className="w-full h-full flex flex-col gap-2 p-5 overflow-y-scroll">
            <div className="w-full text-6xl text-center font-bold">
                {startup.name}
            </div>
            <div className="w-full border border-black p-2 rounded-md text-sm">
                {startup.description}
            </div>
            <div className="w-full border flex flex-row justify-between border-black p-2 rounded-md">
                <div className="text-lg">Founded on: {startup.founded_on}</div>
                <div className="text-lg">Domain: {startup.domain}</div>
                <div className="text-lg">Valuation: {startup.valuation}</div>
            </div>
            <div className="text-lg">Investors: {startup.investors.join(',')}</div>
            <div className="w-full grid grid-cols-4 gap-2">
                <div className="col-span-1">
                    <AddEmployee startup={params.startup}/>
                </div>
                <div className="col-span-3">
                    <Employees startup={params.startup}/>
                </div>
            </div>
            <div className="w-full grid grid-cols-4 gap-2">
                <div className="col-span-1">
                    <AddJob startup={params.startup}/>
                </div>
                <div className="col-span-3">
                    <Jobs startup={params.startup}/>
                </div>
            </div>
        </div>
    )
}
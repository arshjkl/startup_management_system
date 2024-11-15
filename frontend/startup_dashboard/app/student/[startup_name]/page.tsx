

interface StartupNameProps {
    params: {
        startup_name:string
    };
}

interface StartupDetails {
    name: string,
    description: string,
    founders: string[]
}

export default function Startup({params}:StartupNameProps) {

    const startup:StartupDetails = {
        name: "Startup Name",
        description: "Startup description",
        founders: [
            "Founder 1",
            "Founder 2",
            "Founder 3",
            "Founder 4"
        ]
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <h1 className="w-full text-center text-3xl font-bold">
                {startup.name}
            </h1>
            <p>
                {startup.description}
            </p>
            <div>
                <p className="font-semibold">
                    Founders:
                </p>
                <div className="grid grid-cols-4">
                    {
                        startup.founders.map((founder)=><p>{founder}</p>)
                    }
                </div>
                
            </div>
            
        </div>
    );
}
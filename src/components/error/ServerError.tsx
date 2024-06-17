import { ServerCrash } from "lucide-react";
const ServerError = () => {
    return (
        <div className="h-[90vh] overflow-hidden p-4 gap-9 flex items-center flex-col justify-center">
            <ServerCrash className=" w-32 h-32" />
            <h1 className=" text-4xl font-bold">500 - Server error</h1>
            <p className="text-center text-xl font-semibold">Apologies, but it seems that our servers are currently experiencing downtime.😔</p>
        </div>
    );
};

export default ServerError;

import { Loader2 } from "lucide-react";

const SpinLoading = () => {
    return (
        <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SpinLoading;

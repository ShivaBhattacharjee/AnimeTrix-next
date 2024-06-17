import SpinLoading from "@/components/loading/SpinLoading";

const loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[70vh]">
            <SpinLoading />
        </div>
    );
};

export default loading;

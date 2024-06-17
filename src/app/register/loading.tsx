import SpinLoading from "@/components/loading/SpinLoading";

const loading = () => {
    return (
        <div className="flex justify-center items-center min-h-[90vh] bg-black">
            <SpinLoading />
        </div>
    );
};

export default loading;

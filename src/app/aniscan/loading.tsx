import SpinLoading from "@/components/loading/SpinLoading";

const loading = () => {
    return (
        <div className=" flex min-h-[80vh] h-auto justify-center items-center">
            <SpinLoading />
        </div>
    );
};

export default loading;

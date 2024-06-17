import SpinLoading from "./SpinLoading";

export const UpcomingSeasonLoading = () => {
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };
    return (
        <div className="mt-6">
            <h1 className="lg:text-3xl opacity-60">{getCurrentYear()}</h1>
            <h1 className="text-3xl lg:text-5xl font-bold">Upcoming</h1>
            <div className="flex flex-col justify-center items-center gap-5 mt-12">
                <SpinLoading />
            </div>
        </div>
    );
};

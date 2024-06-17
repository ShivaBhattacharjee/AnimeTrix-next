const CharactersLoading = () => {
    return (
        <>
            <h1 className=" text-4xl font-bold">Characters</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 max-h-96 overflow-y-scroll hiddenscroll gap-5 2xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index: number) => (
                    <div key={index} className="bg-white/40  animate-pulse duration-200 border-white/40  border-2 rounded-lg items-center p-4 flex justify-between">
                        <div className="flex items-center gap-4 h-20"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CharactersLoading;

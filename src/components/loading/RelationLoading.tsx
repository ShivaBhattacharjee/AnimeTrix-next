const RelationLoading = () => {
    return (
        <section className=" sticky bottom-0 top-0">
            <h1 className="text-4xl font-semibold pl-2">Relation & Seasons</h1>
            <div className=" flex gap-4 overflow-x-auto hiddenscroll duration-200 mt-9">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((relation) => (
                    <div className="flex items-center p-2 hover:cursor-pointer border-2 hover:scale-95 border-white/40 duration-200 rounded-lg" key={relation}>
                        <div className="flex w-72 h-40 dark:bg-white/40 bg-black/40 animate-pulse duration-200"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RelationLoading;

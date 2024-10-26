import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnimeCardSkeleton() {
    return (
        <Card className="group w-full sm:max-w-[16rem] md:max-w-[18rem] h-[28rem] rounded-lg shadow-lg overflow-hidden transition-all cursor-pointer hover:scale-105 duration-200 border-2 border-white/10">
            <CardContent className="p-0 flex flex-col h-full">
                <Skeleton className="w-full h-[65%] rounded-t-lg" />
                <div className="p-4 space-y-3 flex flex-col flex-grow">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex flex-wrap gap-1 mt-2">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-5 w-14 rounded-full" />
                        ))}
                    </div>
                    <div className="mt-auto flex items-center space-x-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

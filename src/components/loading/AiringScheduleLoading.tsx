import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiringScheduleLoading() {
    return (
        <Card className="w-full">
            <CardContent className="p-6">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 bg-muted">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </CardFooter>
        </Card>
    );
}

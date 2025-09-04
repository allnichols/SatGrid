import { Skeleton } from "../ui/skeleton";

export const SkeletonTitle = () => {
    return <Skeleton className="h-6 w-1/2 bg-[#515151]" />;
}

export const SkeletonContent = () => {
    return <Skeleton className="h-4 w-full bg-[#515151]" />;
}
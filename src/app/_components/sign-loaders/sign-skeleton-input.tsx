import { Skeleton } from "../ui";

export function SignSkeletonInput() {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton className="h-5 w-16 rounded-[0.375rem]" />
      <Skeleton className="h-[1.88rem] w-full rounded-[0.375rem]" />
    </div>
  );
}

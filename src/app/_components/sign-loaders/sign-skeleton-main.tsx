import { Skeleton } from "../ui/skeleton";
import { SignSkeletonInput } from "./sign-skeleton-input";

interface SignSkeletonMainProps {
  showFullForm?: boolean;
}

export function SignSkeletonMain({
  showFullForm = false,
}: SignSkeletonMainProps) {
  return (
    <main className="flex flex-col gap-6">
      <Skeleton className="h-[1.88rem] rounded-[0.375rem]" />

      <div className="flex items-center justify-center">
        <div className="h-[1px] flex-1 bg-[#00000011]"></div>
        <p className="mx-4 text-[0.8125rem] text-[#747686]">or</p>
        <div className="h-[1px] flex-1 bg-[#00000011]"></div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {showFullForm ? (
            <>
              <div className="flex gap-4">
                <SignSkeletonInput />
                <SignSkeletonInput />
              </div>

              <div className="flex gap-4">
                <SignSkeletonInput />
              </div>

              <div className="flex gap-4">
                <SignSkeletonInput />
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <SignSkeletonInput />
            </div>
          )}
        </div>

        <Skeleton className="h-[1.88rem] rounded-[0.375rem]" />
      </div>
    </main>
  );
}

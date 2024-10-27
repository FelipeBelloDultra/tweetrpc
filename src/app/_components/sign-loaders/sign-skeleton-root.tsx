import { type SignSkeletonHeader } from "./sign-skeleton-header";
import { type SignSkeletonMain } from "./sign-skeleton-main";

interface SignSkeletonRootProps {
  header?: ReturnType<typeof SignSkeletonHeader>;
  main: ReturnType<typeof SignSkeletonMain>;
}

export function SignSkeletonRoot({ header, main }: SignSkeletonRootProps) {
  return (
    <div className="shadow-clerk mx-auto flex w-[25rem] max-w-[calc(-2.5rem+100vw)] flex-col gap-8 rounded-xl bg-white px-10 py-8">
      {header}
      {main}
    </div>
  );
}

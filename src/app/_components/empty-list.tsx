import { TriangleAlertIcon } from "lucide-react";

export function EmptyList() {
  return (
    <div className="tex-center mt-7 flex flex-col items-center justify-center rounded-md bg-white/30 px-4 py-8">
      <h1 className="w-full max-w-72 text-center text-2xl font-bold leading-8">
        Wow, looks like there are no posts{" "}
        <span className="text-slate-600">yet</span>
        <TriangleAlertIcon className="ml-2 inline-block text-slate-600" />
      </h1>
    </div>
  );
}

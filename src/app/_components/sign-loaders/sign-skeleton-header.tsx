interface SignSkeletonHeaderProps {
  title?: string;
  description?: string;
}

export function SignSkeletonHeader({
  title,
  description,
}: SignSkeletonHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-[0.25rem]">
      {!!title && (
        <h1 className="text-[1.0625rem] font-bold leading-[1.41176] text-[#212126]">
          {title}
        </h1>
      )}

      {!!description && (
        <p className="font-regular text-[0.8125rem] leading-[1.38462] text-[#747686]">
          {description}
        </p>
      )}
    </header>
  );
}

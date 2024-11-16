import Image from "next/image";

interface PostProps {
  content: string;
  createdAt: Date;
  authorName: string;
  authorImage: string;
}

export function Post({
  authorName,
  authorImage,
  content,
  createdAt,
}: PostProps) {
  return (
    <li className="flex items-start gap-2 rounded-md bg-white p-4">
      <Image
        className="h-12 w-12 flex-shrink-0 rounded-full"
        height={48}
        width={48}
        src={authorImage}
        alt="Author's profile picture"
      />

      <div className="flex-1">
        <div className="mb-1 flex flex-wrap items-center justify-between">
          <p className="text-sm font-bold leading-5 text-gray-600">
            {authorName}
          </p>

          <small className="text-xs font-bold leading-5 text-gray-600">
            {formatDistanceToNow(createdAt)}
          </small>
        </div>

        <p className="text-sm font-medium leading-6 text-gray-900">{content}</p>
      </div>
    </li>
  );
}

function formatDistanceToNow(date: Date) {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);

  if (diffInMinutes < 1) {
    return "a few seconds ago";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)} hours ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  }
}

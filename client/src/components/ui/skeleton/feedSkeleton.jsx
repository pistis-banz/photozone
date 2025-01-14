export default function FeedSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-2/3 h-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-1/3 h-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="w-1/3 h-full bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

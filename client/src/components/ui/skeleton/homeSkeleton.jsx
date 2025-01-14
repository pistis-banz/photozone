export default function homeSkeleton() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-1/2 h-full bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-1/2 h-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

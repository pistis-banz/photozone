import { Skeleton } from "./ui/skeleton";

export default function PostLoader() {
  return (
    <div className="max-w-md overflow-hidden bg-white rounded shadow-lg">
      <div className="overflow-hidden aspect-square">
        {/*skeleton de l'image de l'article */}
        <Skeleton className="relative w-full h-full" />
      </div>

      {/* Section d'informations en bas */}
      <div className="flex items-center justify-between p-4">
        {/* Profil de l'utilisateur */}
        <div className="flex items-center space-x-2">
          <Skeleton className="rounded-full size-8" />
          <div>
            <Skeleton className="w-32 h-4 rounded-full" />
            <Skeleton className="w-32 h-4 rounded-full" />
          </div>
        </div>
        {/* Actions et likes */}
        <div className="flex items-center space-x-4">
          <Skeleton className="size-8 animate-pulse" />
          <Skeleton className="size-8 animate-pulse" />
          <Skeleton className="size-8 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

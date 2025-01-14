import postImage from "@/assets/post.jpg";
import { Heart, MessageSquare, MoreHorizontal } from "lucide-react";

export default function post() {
  return (
    <div className="max-w-md overflow-hidden bg-white rounded shadow-lg">
      <div className="overflow-hidden aspect-square">
        <img
          src={postImage}
          alt="Montagne"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Section d'informations en bas */}
      <div className="flex items-center justify-between p-4">
        {/* Profil de l'utilisateur */}
        <div className="flex items-center space-x-2">
          <img
            src="https://github.com/shadcn.png"
            alt="Avatar de l'utilisateur"
            className="rounded-full size-8"
          />
          <div>
            <p className="text-sm font-semibold">edward elric </p>
            <p className="text-xs text-gray-500">8 hrs ago</p>
          </div>
        </div>

        {/* Actions et likes */}
        <div className="flex items-center space-x-4">
          <p className="text-sm font-semibold">894 likes</p>
          <Heart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-red-500" />
          <MessageSquare className="text-gray-600 cursor-pointer size-5 hover:text-blue-500" />
          <MoreHorizontal className="text-gray-600 cursor-pointer size-5" />
        </div>
      </div>
    </div>
  );
}

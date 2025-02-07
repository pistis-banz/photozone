import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";
import { Heart, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const avatarUrl = useAuthStore((state) => state.avatarUrl);

  const { username } = user;

  return (
    <header className="flex items-center justify-between w-screen p-2 px-5 bg-white shadow-md ">
      {/* Titre du Site */}
      <Link to="/" className="flex-grow text-lg font-bold text-primary">
        PHOTOZONE
      </Link>

      {/* Menu */}
      <nav className="flex flex-grow gap-8">
        <button className="text-gray-600 hover:text-primary">
          <Link to="/">
            <Home className="size-6" />
          </Link>
        </button>

        <button className="text-gray-600 hover:text-primary">
          <Link to="/feed">
            <Search className="size-6" />
          </Link>
        </button>
        <button className="text-gray-600 hover:text-primary">
          <Link to="/like">
            <Heart className="size-6" />
          </Link>
        </button>
      </nav>

      {/*parametre du Profil de l'utilisateur */}

      <button className="flex items-center justify-between w-32 p-1 px-2 space-x-2 transition-all border-2 rounded-full shadow-md hover:bg-pink-100 active:bg-primary">
        <div>
          <p className="text-sm text-[#a2a2a2] font-semibold hover:text-white active:text-white">
            {username || "utilisateur"}
          </p>
        </div>
        <Avatar className=" size-7">
          <AvatarImage src={avatarUrl || "/account.png"} />
        </Avatar>
      </button>
    </header>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userDataContext from "@/contexts/userData.context";
import { Heart, Home, Search } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { username } = useContext(userDataContext);
  console.log(useContext(userDataContext));
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
      <button className="flex items-center justify-center px-2 space-x-2 rounded-full flex-p-1">
        <div>
          <p className="text-sm text-[#a2a2a2] font-semibold">{username} </p>
        </div>
        <Avatar className=" size-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </button>
    </header>
  );
}

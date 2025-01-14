import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-screen h-screen bg-background">
      <Header />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page not found</p>
        <Link href="/">Retourner à l&apos;accueil</Link>
      </div>
    </div>
  );
}

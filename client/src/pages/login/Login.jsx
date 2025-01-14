import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Ajoutez ici la logique de connexion
    axios
      .post("http://localhost:3000/user/login", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("mot de passe ou nom d'utilisateur incorrect");
        } else {
          toast.error("une erreur s'est produite");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-rose-50">
      <div className="flex flex-row w-5/6 p-4 bg-white rounded-lg shadow-md h-5/6">
        <Card className="w-full h-full font-black bg-center bg-cover bg-login backdrop-opacity-40 backdrop-invert ">
          <CardHeader className="flex flex-col justify-between tracking-wide h-[40%] font-black text-rose-500">
            <CardTitle>Bienvenue sur Photozone !</CardTitle>
            <CardDescription className="text-black">
              Le lieu où chaque instant capturé raconte une histoire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            Connectez-vous pour partager vos photos, explorer de nouvelles
            inspirations et vous connecter avec des amis du monde entier.
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-center w-full h-full">
          <Card className="w-11/12 h-4/5">
            <CardHeader>
              <CardTitle className="text-center">CONNECTEZ-VOUS</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center space-y-4"
              >
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  nom d&apos;utilisateur
                </Label>
                <Input
                  type="text"
                  placeholder="votre nom d'utilisateur"
                  {...register("username", { require: true })}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.username && (
                  <p className="text-red-500">
                    veuillez inserer votre nom d&apos;utilisateur
                  </p>
                )}
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  password
                </Label>
                <Input
                  type="password"
                  placeholder="inserer le mot de passe"
                  {...register("password", {
                    required: true,
                  })}
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">
                    veuillez insérer votre mot de passe valide
                  </p>
                )}
                <Button
                  className="text-white cursor-pointer bg-primary"
                  asChild
                  onclick={() => {
                    toast({
                      title: "Uh oh! Something went wrong.",
                    });
                  }}
                >
                  <input type="submit" value="poster" />
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <a className="inline-block text-right text-gray-700 cursor-pointer">
                {" "}
                j&apos;ai oublié mon mot de passe{" "}
              </a>
            </CardFooter>
          </Card>
          <a className="inline-block text-right text-gray-700 cursor-pointer">
            {" "}
            nouveau sur photozone ?{" "}
            <Link to="/signup" className="underline-offset-8 text-rose-300">
              créez un compte
            </Link>{" "}
          </a>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

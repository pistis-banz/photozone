import account from "@/assets/account.png";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebouncing from "@/hooks/usedeboucing";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [usernameQuery, setUsernameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(account);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // verification du poid de l'image
      const fileSize = file.size;

      if (fileSize > 5 * 1024 * 1024) {
        e.target.value = null;
        toast.error("La taille de l'image est trop importante");
        return;
      }

      const allowedExtension = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase;

      if (allowedExtension.includes(fileExtension)) {
        e.target.value = null;
        toast.error("ce format n'est pas autorisé");
        return;
      }

      setSelectedImage(URL.createObjectURL(file));
    }
  };
  // const handleEmailVerify = (e) => {
  //   console.log(e.target.value);
  //   axios
  //     .get("http://localhost:3000/user/email/" + e.target.value)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       if (error.response.status === 400) {
  //         toast.error("ce email est deja utilisé");
  //       }
  //     });
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/username/" + usernameQuery)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          toast.error("ce nom d'utilisateur est deja utilisé");
        }
      });
  }, [useDebouncing(usernameQuery, 500)]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/email/" + emailQuery)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          toast.error("cet adresse mail est deja utilisé");
        }
      });
  }, [useDebouncing(emailQuery, 500)]);

  const onSubmit = function (data) {
    setIsLoading(true);
    // logique de connexion

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("username", data.username);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("birthdate", data.birthdate);
    formData.append("gender", data.gender);
    formData.append("avatar", data.avatar[0]);

    // var {isLoading, error, result} = useQuery('fetchData', () => { fetch("http://localhost:3000/user/register", { method: "POST", headers: {
    //   "Content-Type": "multipart/form-data",
    // }, body: formData}).then(res => res.json()) })

    axios
      .post("http://localhost:3000/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function () {
        setIsLoading(false);
        
      })
      .catch(function () {
        setIsLoading(false);
        toast.error("une erreur s'est produite");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour vous inscrire.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="flex flex-col flex-wrap justify-center space-y-4"
          >
            {/* creation du bouton de la photo de profil */}
            <div className="flex flex-col">
              <label
                htmlFor="avatar"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <img
                  src={selectedImage}
                  alt="avatar"
                  className="object-cover border-2 border-gray-300 rounded-full h-28 w-28"
                />
                <input
                  accept=".jpg, .jpeg, .png"
                  id="avatar"
                  className="hidden"
                  onInput={handleImageUpload}
                  type="file"
                  name="avatar"
                  {...register("avatar", { required: false })}
                />
              </label>

              {errors.avatar && (
                <p className="text-red-500">* {errors.avatar.message}</p>
              )}
            </div>
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              nom d&apos;utilisateur
            </Label>
            <Input
              type="text"
              id="username"
              onInput={(e) => {
                setUsernameQuery(e.target.value);
              }}
              placeholder="votre nom d'utilisateur"
              {...register("username", { require: true })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.username && (
              <p className="text-red-500">veuillez inserer votre pseudo</p>
            )}

            <Label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-700"
            >
              prénom
            </Label>
            <Input
              type="text"
              id="firstname"
              placeholder="votre prénom"
              {...register("firstname", { require: true })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.firstname && (
              <p className="text-red-500">veuillez inserer votre prénom</p>
            )}

            <Label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700"
            >
              nom
            </Label>
            <Input
              type="text"
              id="lastname"
              placeholder="votre nom"
              {...register("lastname", { require: true })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.lastname && (
              <p className="text-red-500">veuillez inserer votre nom</p>
            )}

            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              email
            </Label>
            <input
              type="email"
              id="email"
              onInput={(e) => {
                setEmailQuery(e.target.value);
              }}
              placeholder="votreemail@gmail.com"
              {...register("email", { require: true, pattern: /^\S+@\S+$/i })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.email && (
              <p className="text-red-500">veuillez inserer votre email</p>
            )}

            <Label
              htmlFor="birthdate"
              className="text-sm font-medium text-gray-700"
            >
              votre sexe
            </Label>
            <label htmlFor="male">homme</label>
            <Input
              type="radio"
              id="male"
              {...register("gender", {
                required: true,
              })}
              value="male"
              className=""
              required
            />
            <label htmlFor="female">femme</label>
            <Input
              id="female"
              type="radio"
              {...register("gender", {
                required: true,
              })}
              value="female"
              className=""
              required
            />

            <Label
              htmlFor="birthdate"
              className="text-sm font-medium text-gray-700"
            >
              votre date de naissance
            </Label>
            <Input
              type="date"
              id="birthdate"
              {...register("birthdate", {
                required: true,
              })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.birthdate && (
              <p className="text-red-500">
                veuillez inserer votre date de naissance
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
              id="password"
              placeholder="inserer le mot de passe"
              {...register("password", {
                required: true,
              })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.password && (
              <p className="text-red-500">
                veuillez créer un mot de passe valide
              </p>
            )}
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              confirm password
            </Label>
            <Input
              type="text"
              id="confirmPassword"
              placeholder="confirmer le mot de passe"
              {...register("confirmPassword", {
                required: true,
              })}
              className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">
                les mots de passe ne correspondent pas
              </p>
            )}

            {!isLoading ? (
              <Button className="text-white cursor-pointer bg-primary" asChild>
                <input type="submit" value="poster" />
              </Button>
            ) : (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Déjà inscrit?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}

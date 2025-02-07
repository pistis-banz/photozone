import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

const validateFile = (file) => {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    return "La taille de l'image est trop grande (max 5 MB)";
  }

  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return "Format d'image non autorisé (jpg, jpeg, png uniquement)";
  }

  return null;
};

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(account);
  const [usernameQuery, setUsernameQuery] = useState("");
  const [emailQuery, setEmailQuery] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const validationError = validateFile(file);

    if (validationError) {
      e.target.value = null;
      toast.error(validationError);
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    const controller = new AbortController();

    if (usernameQuery) {
      fetch(`http://localhost:3000/user/username/${usernameQuery}`, {
        method: "GET",
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok && response.status === 400) {
            setError("username", {
              type: "manual",
              message: "Ce nom d'utilisateur est déjà utilisé",
            });
          }
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
    }

    return () => controller.abort();
  }, [useDebouncing(usernameQuery, 500)]);

  useEffect(() => {
    const controller = new AbortController();

    if (emailQuery) {
      fetch(`http://localhost:3000/user/email/${emailQuery}`, {
        method: "GET",
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok && response.status === 400) {
            setError("email", {
              type: "manual",
              message: "Cette adresse email est déjà utilisée",
            });
          }
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
    }

    return () => controller.abort();
  }, [useDebouncing(emailQuery, 500)]);

  const onSubmit = (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("avatar", data.avatar[0]);

    fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        setIsLoading(false);

        if (response.ok) {
          toast.success("Compte créé avec succès !");
          toast.success("vous pouvez maintenant vous connectez");
          navigate("/login");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Une erreur s'est produite");
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Une erreur s'est produite lors de l'inscription");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Créer un compte
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-gray-500">
            Remplissez le formulaire ci-dessous pour vous inscrire.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="flex flex-col items-center">
              <label htmlFor="avatar" className="cursor-pointer">
                <img
                  src={selectedImage}
                  alt="avatar"
                  className="border-4 border-dashed rounded-full w-28 h-28"
                />
              </label>
              <input
                id="avatar"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                {...register("avatar", { required: "L'avatar est requis" })}
                onInput={handleImageUpload}
              />
              {errors.avatar && (
                <p className="text-xs text-red-500">{errors.avatar.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="firstname">Prénom</Label>
              <Input
                id="firstname"
                placeholder="Prénom"
                {...register("firstname", { required: "Ce champ est requis" })}
              />
              {errors.firstname && (
                <p className="text-xs text-red-500">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastname">Nom</Label>
              <Input
                id="lastname"
                placeholder="Nom"
                {...register("lastname", { required: "Ce champ est requis" })}
              />
              {errors.lastname && (
                <p className="text-xs text-red-500">
                  {errors.lastname.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="birthdate">Date de naissance</Label>
              <Input
                id="birthdate"
                type="date"
                {...register("birthdate", { required: "Ce champ est requis" })}
              />
              {errors.birthdate && (
                <p className="text-xs text-red-500">
                  {errors.birthdate.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Sexe</Label>
              <select
                id="gender"
                {...register("gender", { required: "Ce champ est requis" })}
                className="input-primary"
              >
                <option value="">Sélectionnez</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="other">Autre</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                placeholder="Nom d'utilisateur"
                onInput={(e) => setUsernameQuery(e.target.value)}
                {...register("username", { required: "Ce champ est requis" })}
              />
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                onInput={(e) => setEmailQuery(e.target.value)}
                {...register("email", { required: "Ce champ est requis" })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mot de passe"
                {...register("password", { required: "Ce champ est requis" })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "S'inscrire"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Connectez-vous
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

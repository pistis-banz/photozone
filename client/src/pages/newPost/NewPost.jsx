import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function NewPost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  console.log(open);
  return (
    <div>
      {/* boite de dialogue du formulaire */}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            reset();
            setSelectedImage(null);

            setOpen(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="fixed flex items-center justify-center font-bold text-center text-white transition-all rounded-full right-2 bottom-2 size-12 bg-primary bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 active:bg-red-500"
          >
            <Plus className="font-black" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">nouveau post</DialogTitle>
          </DialogHeader>
          {/* le corps du formulaire  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-4"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  description
                </Label>
                <Textarea
                  id="description"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="description"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="text-red-500">la description est obligatoire</p>
                )}
              </div>
              <div>
                {/*interface d'upload de la photo */}
                <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500">
                  <Label
                    htmlFor="file"
                    className="flex flex-col justify-center"
                  >
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Aperçu de l'image"
                        className="object-fill mb-4 rounded-md size-72"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-32 text-center text-gray-500">
                        <Upload className="w-10 h-10 mb-2" />
                        <p>
                          Déposez une image ici ou cliquez pour sélectionner
                        </p>
                      </div>
                    )}
                    <Button className="mt-4 text-white bg-blue-500 hover:bg-blue-600">
                      <input
                        type="file"
                        accept="image/*"
                        onInput={handleImageUpload}
                        id="file"
                        {...register("file", { required: true })}
                      />
                    </Button>
                  </Label>
                </div>
              </div>
            </div>
            {errors.file && (
              <p className="text-red-500">veuiller deposer une photo</p>
            )}
            <Button className="text-white cursor-pointer bg-primary" asChild>
              <input type="submit" value="poster" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

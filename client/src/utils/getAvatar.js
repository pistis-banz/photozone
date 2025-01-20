export const getAvatar = async (id, token) => {
  try {
    const response = await fetch(`http://localhost:3000/user/avatar/${id}`, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    if (response.ok) {
      const file = await response.blob();
      return file;
    } else {
      throw new Error("Échec de la récupération de l'avatar");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'avatar : ", error);
    return null;
  }
};

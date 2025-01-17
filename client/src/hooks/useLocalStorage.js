// creation du hook useLocalStorage
import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // useState hook pour stocker la valeur de l'état
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // récupération de la valeur de l'état à partir de la mémoire locale
      const item = window.localStorage.getItem(key);
      // si la valeur existe, on la récupère et on la stocke dans la variable storedValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // si une erreur survient, on la gère et on la stocke dans la variable storedValue
      console.log(error);
      return initialValue;
    }
  });

  // useState hook pour stocker la fonction de stockage de l'état
  const setValue = (value) => {
    try {
      // stockage de la valeur dans la mémoire locale
      window.localStorage.setItem(key, JSON.stringify(value));
      // stockage de la valeur dans la variable storedValue
      setStoredValue(value);
    } catch (error) {
      // si une erreur survient, on la gère
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
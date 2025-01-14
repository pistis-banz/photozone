import { createContext } from "react";
// const [data, setData] = useState("");
// const [token, setToken] = useState(localStorage.getItem("token"));

// if (token) {
//   try {
//     if (atob(token.split(".")[1])) {
//       setData(JSON.parse(atob(token.split(".")[1])));
//     }
//     var userDataContext = createContext(data);
//   } catch {
//     localStorage.removeItem("token");
//   }
// }

const token = localStorage.getItem("token");

if (token) {
  const data = JSON.parse(atob(token.split(".")[1]));
  
  var userDataContext = createContext(data);
} else {
  localStorage.removeItem("token");
}

export default userDataContext;

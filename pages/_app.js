import { useMemo, useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import "../scss/global.scss";
import { setToken, getToken } from "../api/token";
import { ToastContainer } from "react-toastify";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

export default function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  //esta funcion guardara los datos en el localstorage y
  //decodificara el token para enviarlo a authdata
  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setReloadUser,
    }),
    [auth]
  );
  if (auth === undefined) return null;
  return (
    <AuthContext.Provider value={authData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

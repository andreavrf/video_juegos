import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(props) {
  const { onCloseModal, setTitleModal } = props;

  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setTitleModal("Inicia sesión");
    setShowLogin(true);
  };
  const showResgisterForm = () => {
    setTitleModal("Registro de usuario");
    setShowLogin(false);
  };

  return showLogin ? (
    <LoginForm showResgisterForm={showResgisterForm} />
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  );
}

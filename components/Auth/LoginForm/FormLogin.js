import { useState } from "react";

import { loginApi } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";

import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function FormLogin(props) {
  const { showResgisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);

        onCloseModal();
      } else {
        toast.error("El email o la contraseña son incorrectos");
      }
      setLoading(false);
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Email"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button
          className="submit"
          type="submit"
          onSubmit={formik.handleSubmit}
          loading={loading}
        >
          Iniciar sesión
        </Button>
        <div>
          <Button type="button" basic onClick={showResgisterForm}>
            Registarse
          </Button>
          <Button type="button" basic>
            Recuperar contraseña
          </Button>
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}

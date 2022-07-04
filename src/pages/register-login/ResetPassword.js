import React from "react";
// import { LoginForm } from "../../components/login-form/LoginForm";
import { ResetPassForm } from "../../components/password-reset/ResetPassForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const ResetPassword = () => {
  return (
    <DefaultLayout>
      <ResetPassForm />
    </DefaultLayout>
  );
};

export default ResetPassword;

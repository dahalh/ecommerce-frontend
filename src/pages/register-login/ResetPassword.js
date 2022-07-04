import React from "react";
import { useSelector } from "react-redux";
import { ResetPassForm } from "../../components/password-reset/ResetPassForm";
import { ResetPasswordOTPForm } from "../../components/password-reset/ResetPasswordOTPForm";
import { DefaultLayout } from "../layouts/DefaultLayout";

const ResetPassword = () => {
  const { showForm } = useSelector((state) => state.admin);

  const form = {
    otp: <ResetPassForm />,
    password: <ResetPasswordOTPForm />,
  };
  return <DefaultLayout>{form[showForm]}</DefaultLayout>;
};

export default ResetPassword;

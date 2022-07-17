import React from "react";
import { RegisterForm } from "../../components/register-form/RegisterForm";
import AdminLayout from "../layouts/AdminLayout";

const RegistrationPage = () => {
  return (
    <AdminLayout>
      <RegisterForm />
    </AdminLayout>
  );
};

export default RegistrationPage;

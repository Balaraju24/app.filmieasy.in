import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import LoginForm from "../an/Auth/LoginForm";
import { useMutation } from "@tanstack/react-query";
import { userLoginApi } from "@/http/services/auth";
import { LoginResponse } from "@/lib/interfaces/Auth";
import { toast } from "sonner";
import { set } from "date-fns";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate: LoginMutate, isPending: isLoginPending } = useMutation({
    mutationFn: (details: { email: string | null; password: string | null }) =>
      userLoginApi(details),
    onSuccess: (response: LoginResponse) => {
      toast.success(response?.message);
      const { access_token, refresh_token } = response.data;
      Cookies.set("token", access_token);
      Cookies.set("refresh_token", refresh_token);
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      if (error?.data?.status === 422) {
        const emailErrors =
          error?.data?.errData.email 
        const passwordErrors =
          error?.data?.errData.password 
        setEmailError(emailErrors);
        setPasswordError(passwordErrors);
      } else {
        toast.error(
          error?.data?.message ||
            "Something went wrong, Please try again later."
        );
      }
    },
  });

  const handleLogin = () => {
    const payload: { email: string | null; password: string | null } = {
      email: email.trim() !== "" ? email : null,
      password: password.trim() !== "" ? password : null,
    };
    LoginMutate(payload);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      onLogin={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      emailError={emailError}
      setEmailError={setEmailError}
      passwordError={passwordError}
      setPasswordError={setPasswordError}
      isLoading={isLoginPending}
    />
  );
}

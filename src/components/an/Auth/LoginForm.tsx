import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginFormProps } from "@/lib/interfaces/Auth";
import FilmEasy from "@/components/Icons/Auth/FilmEasy";
import { useNavigate } from "@tanstack/react-router";
import loginBg from "@/assets/login-bg.webp";
function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onLogin,
  onForgotPassword,
  onSignUp,
  emailError,
  setEmailError,
  passwordError,
  setPasswordError,
  isLoading,
}: LoginFormProps) {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex items-center justify-center gap-2 overflow-hidden">
      <img
        src={loginBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="w-full max-w-lg space-y-6 relative z-20">
        <div className="text-center space-y-2">
          <div className="flex justify-center w-full">
            <div className="">
              <FilmEasy />
            </div>
          </div>
          <p className="lg:text-[16px] sm:text-xs text-gray-300 max-w-xs sm:max-w-lg mx-auto px-2">
            Complete production management platform for filmmakers. From script
            to screen, manage every aspect of your production.
          </p>
        </div>
        <Card className="backdrop-blur-[16px] py-4 bg-white/30 border-white/10 shadow-2xl">
          <CardHeader className="text-center gap-0">
            <CardTitle className="text-2xl font-normal text-white">
              Login
            </CardTitle>
            <CardDescription className="text-gray-300 font-light text-[16px]">
              Greetings! Kindly enter your credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-0">
                <Label
                  htmlFor="email"
                  className="text-gray-300 !gap-1 font-normal text-[14px]"
                >
                  Email<span className="text-(--an-card-error-color)">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
                />
                {emailError && (
                  <p className="text-red-500 text-xs">{emailError}</p>
                )}
              </div>
              <div className="space-y-0">
                <Label
                  htmlFor="password"
                  className="text-gray-300 !gap-1 font-normal text-[14px]"
                >
                  Password{" "}
                  <span className="text-(--an-card-error-color)">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    className="bg-white/10 border border-[#00000026]  text-white placeholder:text-gray-400 pr-10 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white "
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-xs">{passwordError}</p>
                )}
              </div>
              <div className="text-right">
                <button
                  onClick={onForgotPassword}
                  className="text-sm text-gray-300 hover:text-white  cursor-pointer"
                >
                  Forgot Password ?
                </button>
              </div>
              <Button
                onClick={onLogin}
                disabled={isLoading}
                className="w-full bg-[#4A90E2] rounded-sm hover:bg-blue-600 text-white  cursor-pointer"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                    Logging in
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <p className="text-center text-sm text-gray-300">
                New to Filmieasy?{" "}
                <button
                  onClick={() => navigate({ to: "/signup" })}
                  className="text-[#F2994A] hover:text-orange-400  font-normal cursor-pointer"
                >
                  Sign Up here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;

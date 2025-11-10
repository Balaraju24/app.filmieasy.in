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
import { Eye, EyeOff } from "lucide-react";
import { SignupFormProps } from "@/lib/interfaces/Auth";
import FilmEasy from "@/components/Icons/Auth/FilmEasy";
import loginBg from "@/assets/login-bg.webp"; 

function SignupForm({
  fullName,
  email,
  phone,
  password,
  confirmPassword,
  fullNameError,
  setFullNameError,
  emailError,
  setEmailError,
  phoneError,
  setPhoneError,
  passwordError,
  setPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSignup,
  onLogin,
  isLoading,
}: SignupFormProps) {
  return (
    <div className="relative h-screen flex items-center justify-center gap-2 overflow-hidden">
      <img
        src={loginBg} 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="w-full max-w-lg space-y-4 relative z-20">
        <div className="text-center space-y-0">
          <div className="flex justify-center w-full">
            <div className="">
              <FilmEasy />
            </div>
          </div>
          <p className="text-sm lg:text-[16px] sm:text-xs mt-2 text-gray-300 max-w-xs sm:max-w-lg mx-auto px-2">
            Complete production management platform for filmmakers. From script
            to screen, manage every aspect of your production.
          </p>
        </div>
        <Card className="backdrop-blur-[16px] space-y-2 py-4 gap-4 bg-white/30 border-white/10 shadow-2xl max-w-[95%] mx-auto lg:max-w-full">
          <CardHeader className="text-center gap-0">
            <CardTitle className="text-2xl font-normal text-white">Sign Up</CardTitle>
            <CardDescription className="text-gray-300 text-[16px]">
              Create your account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-0 relative mb-5">
                <Label htmlFor="fullName" className="text-gray-300 !gap-1 font-normal text-[14px]">
                  Full Name
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => {
                    onFullNameChange(e.target.value);
                    if (fullNameError) setFullNameError("");
                  }}
                  className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
                />
                {fullNameError && (
                                                          <div
                      className="absolute left-0/2 -translate-x-0/2 top-full mt-0 
                                bg-red-600 text-white text-[10px] px-2 py-1 rounded-[4px] w-full
                                shadow-lg  whitespace-normal break-words"
                    >
                      {fullNameError.charAt(0).toUpperCase() + fullNameError.slice(1)}
                      <div
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                                  w-0 h-0 border-4 border-transparent border-b-red-600"
                      ></div>
                    </div>
                )}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-0 relative mb-3">
                  <Label htmlFor="email" className="text-gray-300 !gap-1 font-normal text-[14px]">
                    Email
                    <span className="text-(--an-card-error-color)"> *</span>
                  </Label>
                  <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      onEmailChange(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
                  />
                  {emailError && (
                                        <div
                      className="absolute left-0/2 -translate-x-0/2 top-full mt-0 
                                bg-red-600 text-white text-[10px] px-2 py-1 rounded-[4px] w-full 
                                shadow-lg text-left whitespace-normal break-words"
                    >
                      {emailError.charAt(0).toUpperCase() + emailError.slice(1)}
                      <div
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                                  w-0 h-0 border-4 border-transparent border-b-red-600"
                      ></div>
                    </div>
                  )}
                </div>
                </div>
                <div className="flex-1 space-y-0 relative">
                  <Label htmlFor="phone" className="text-gray-300 !gap-1 font-normal text-[14px]">
                    Phone
                    <span className="text-(--an-card-error-color)"> *</span>
                  </Label>
                  <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        onPhoneChange(value);
                        if (phoneError) setPhoneError("");
                      }
                    }}
                    className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
                  />
                  {phoneError && (
                    <div
                      className="absolute left-0/2 -translate-x-                                                                                          /2 top-full mt-0 
                                bg-red-600 text-white text-[10px] px-2 py-1 rounded-[4px] 
                                shadow-lg text-left whitespace-normal break-words w-full"
                    >
                      {phoneError.charAt(0).toUpperCase() + phoneError.slice(1)}
                      <div
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                                  w-0 h-0 border-4 border-transparent border-b-red-600"
                      ></div>
                    </div>
                  )}
                </div>
                </div>
              </div>
              <div className="space-y-0 relative mb-5">
                <Label htmlFor="password" className="text-gray-300  !gap-1 font-normal text-[14px]">
                  Password
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      onPasswordChange(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
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
                     <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-0 
                                bg-red-600 text-white text-[10px] px-2 py-1 rounded-[4px] 
                                shadow-lg text-left whitespace-normal break-words w-full"
                    >
                      {passwordError.charAt(0).toUpperCase() + passwordError.slice(1)}
                      <div
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                                  w-0 h-0 border-4 border-transparent border-b-red-600"
                      ></div>
                    </div>
                )}
              </div>
              <div className="space-y-0">
                <Label htmlFor="confirmPassword" className="text-gray-300  !gap-1 font-normal text-[14px]">
                  Confirm Password
                  <span className="text-(--an-card-error-color)"> *</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      onConfirmPasswordChange(e.target.value);
                      if (confirmPasswordError) setConfirmPasswordError("");
                    }}
                    className="bg-white/10 border border-[#00000026] focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none focus:ring-0 focus-visible:ring-0 text-white placeholder:text-gray-400  transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white "
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                                       <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-0 
                                bg-red-600 text-white text-[10px] px-2 py-1 rounded-[4px] 
                                shadow-lg text-center whitespace-normal break-words w-full"
                    >
                      {confirmPasswordError.charAt(0).toUpperCase() + confirmPasswordError.slice(1)}
                      <div
                        className="absolute top-[-6px] left-1/2 -translate-x-1/2 
                                  w-0 h-0 border-4 border-transparent border-b-red-600"
                      ></div>
                    </div>
                )}
              </div>
              <Button
                onClick={onSignup}
                disabled={isLoading}
                className="w-full bg-[#4A90E2] hover:bg-blue-600 text-white mt-2 cursor-pointer disabled:opacity-50"
                size="lg"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
              <p className="text-center text-sm text-white lg:text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={onLogin}
                  className="text-[#F2994A] hover:text-orange-400  font-normal cursor-pointer"
                >
                  Login here.
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignupForm;
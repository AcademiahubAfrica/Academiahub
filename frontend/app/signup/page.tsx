"use client"
import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft, FaApple } from 'react-icons/fa';
import toast from 'react-hot-toast';


import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      toast.success('Sign up successful!');
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image (hidden on mobile, sticky on desktop) */}
      <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
        <div className="h-full flex items-end">
          <img 
            src="/assets/images/signup-image.png" 
            alt="Education" 
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center gap-3 mb-2 cursor-pointer" onClick={() => router.push("/")}>
              <img 
                src="/assets/images/academialogo.png" 
                alt="AcademiaHub Logo" 
                className="h-12 w-auto"
              />
              <div>
                <img 
                  src="/assets/images/Logoimage.png" 
                  alt="AcademiaHub Logo Text" 
                  className="h-12 w-auto"
                />
              </div>
            </div>
            <p className="body-text text-foreground/70 mt-4">
              Welcome! Sign up now.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block label font-medium text-foreground mb-2">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    errors.fullName ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
              </div>
              {errors.fullName && (
                <p className="label text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block label font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    errors.email ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
              </div>
              {errors.email && (
                <p className="label text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block label font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    errors.password ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="label text-destructive mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block label font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    errors.confirmPassword ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="label text-destructive mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between label">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange('rememberMe', e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary"
                />
                <span className="text-foreground text-sm">Remember me</span>
              </label>
              <button onClick={() => router.push("/reset-password")} className="text-foreground text-sm hover:underline">
                Forgotten password?
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-colors"
            >
              Sign up
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center label">
                <span className="px-4 bg-background text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
              >
                <FcGoogle className="h-5 w-5" />
                <span className="font-medium text-foreground">Continue with Google</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
              >
                <FaMicrosoft className="h-5 w-5 text-[#00a4ef]" />
                <span className="font-medium text-foreground">Continue with Microsoft</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border hover:bg-muted transition-colors"
              >
                <FaApple className="h-5 w-5 text-foreground" />
                <span className="font-medium text-foreground">Continue with Apple</span>
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center body-text text-muted-foreground mt-6">
            Already have an account?{' '}
            <button onClick={() => router.push("/login")} className="text-primary font-medium hover:underline">
              Sign In
            </button>
          </p>

          {/* Terms & Conditions */}
          <p className="text-center label text-muted-foreground mt-6">
            By proceeding, you consent to our{' '}
            <button className="text-primary underline">
              Terms & Conditions
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
"use client"
import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import Image from 'next/image';



interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: ''
  });

    const router = useRouter();

  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkPasswordRequirements = (password: string): PasswordRequirement[] => {
    return [
      {
        text: 'Must be 8 characters long',
        met: password.length >= 8
      },
      {
        text: 'Must have at least 1 uppercase and 1 lowercase',
        met: /[a-z]/.test(password) && /[A-Z]/.test(password)
      },
      {
        text: 'Must have at least one special symbol',
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];
  };

  const requirements = checkPasswordRequirements(formData.newPassword);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (!requirements.every(req => req.met)) {
      newErrors.newPassword = 'Password does not meet all requirements';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Password reset submitted:', formData);
      toast.success('Password reset successful!');
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Image (hidden on mobile, sticky on desktop) */}
      <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
        <div className="h-full flex items-end">
          <Image 
            src="/assets/images/reset-password.png" 
            alt="Security" 
            className="w-full h-full object-cover "
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image 
                src="/assets/images/academialogo.png" 
                alt="AcademiaHub Logo" 
                className="h-16 w-auto cursor-pointer"
                onClick={() => router.push("/")}
              />
            </div>
            <h1 className="heading-1 font-semibold text-foreground mb-2">
              Reset Password
            </h1>
            <p className="body-text text-muted-foreground">
              Kindly enter your new password
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.newPassword}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    errors.newPassword ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="label text-destructive mt-1">{errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Password"
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

            {/* Password Requirements */}
            <div className="space-y-2 pt-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 
                    className={`h-5 w-5 ${
                      req.met ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  />
                  <span className={`body-text ${
                    req.met ? 'text-green-600' : 'text-muted-foreground'
                  }`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-xl transition-colors mt-6"
            >
              Reset Password
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center body-text text-muted-foreground mt-6">
            Already have an account?{' '}
            <button onClick={() => router.push("/login")} className="text-primary font-medium hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
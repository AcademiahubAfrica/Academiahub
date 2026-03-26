"use client"
import { useState } from 'react';
import { User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface FormData {
  fullName: string;
  institution: string;
  department: string;
}

interface FormErrors {
  fullName?: string;
  institution?: string;
  department?: string;
}

const ProfileSetup = () => {
    const [formData, setFormData] = useState<FormData>({
    fullName: '',
    institution: '',
    department: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Profile setup submitted:', formData);
      toast.success('Registration completed successfully!');
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
            src="/assets/images/signup-image.png" 
            alt="Education" 
            className="w-full h-full object-cover object-bottom"
            width={800}
            height={1200}
            priority
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center gap-3 mb-6 cursor-pointer" onClick={() => router.push("/")}>
              <Image 
                src="/assets/images/academialogo.png" 
                alt="AcademiaHub Logo" 
                className="h-12 w-auto"
                width={48}
                height={48}
              />
              <div>
                <Image 
                  src="/assets/images/Logoimage.png" 
                  alt="AcademiaHub Logo Text" 
                  className="h-12 w-auto"
                  width={150}
                  height={48}
                />
              </div>
            </div>
            <h2 className="heading-2 font-semibold text-foreground">
              Create your profile
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
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

            {/* Institution */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                Institution
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter institution"
                  value={formData.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.institution ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
              </div>
              {errors.institution && (
                <p className="label text-destructive mt-1">{errors.institution}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block body-text font-medium text-foreground mb-2">
                Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Department"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.department ? 'border-destructive' : 'border-input'
                  } bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all`}
                />
              </div>
              {errors.department && (
                <p className="label text-destructive mt-1">{errors.department}</p>
              )}
            </div>

            {/* Complete Registration Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium py-3 rounded-xl transition-colors mt-6"
            >
              Complete registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup

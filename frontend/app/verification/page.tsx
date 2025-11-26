"use client"
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

const EmailVerificationPage = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').split('').slice(0, 6);
    
    const newCode = [...code];
    numbers.forEach((num, index) => {
      if (index < 6) {
        newCode[index] = num;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(val => val === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      console.log('Verification code submitted:', verificationCode);
      toast.success('Email verified successfully!');
    } else {
      toast.error('Please enter the complete 6-digit code');
    }
  };

  const handleResendCode = () => {
    if (resendCountdown > 0) return;
    
    setIsResending(true);
    console.log('Resending verification code...');
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendCountdown(30); // 30 seconds countdown
      toast.success('Verification code sent!');
    }, 1000);
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
            <h1 className="text-3xl font-semibold text-foreground mt-4 pb-6">Verify your email</h1>
            <p className="body-text text-foreground/70 mt-2">
              Enter the 6 digit code we sent to your email to complete reset your password
            </p>
          </div>

          {/* Verification Code Input */}
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-input bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              ))}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSubmit}
              disabled={!isCodeComplete}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground font-medium py-3 rounded-xl transition-colors"
            >
              Continue →
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="body-text text-muted-foreground">
                Didn't receive code?{' '}
                <button
                  onClick={handleResendCode}
                  disabled={isResending || resendCountdown > 0}
                  className="text-primary-normal font-medium hover:underline disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                >
                  {isResending ? 'Sending...' : 
                   resendCountdown > 0 ? `Resend code (${resendCountdown}s)` : 
                   'Resend code'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
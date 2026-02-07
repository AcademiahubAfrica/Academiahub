import { Suspense } from "react";
import SignUpContent from "@/components/signup/signUpContent";

const SignUpPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUpPage;
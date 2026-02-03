import { Suspense } from "react";
import SignInContent from "@/components/login/signincontent";


const SignInPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;

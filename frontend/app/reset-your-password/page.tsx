import { Suspense } from "react";
import ResetYourPasswordContent from "@/components/reset-your-password/reset-your-password";

const ResetYourPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <ResetYourPasswordContent />
    </Suspense>
  );
};

export default ResetYourPasswordPage;
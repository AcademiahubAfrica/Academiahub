import { Suspense } from "react";
import PasswordResetSuccess from "@/components/password-reset-success/password-reset-success";

const PasswordResetSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <PasswordResetSuccess />
    </Suspense>
  );
};

export default PasswordResetSuccessPage;
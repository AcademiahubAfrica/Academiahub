import { Suspense } from "react";
import PasswordResetConfirmation from "@/components/password-reset-confirmation/password-reset-confirmation";

const PasswordResetConfirmationPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <PasswordResetConfirmation />
    </Suspense>
  );
};

export default PasswordResetConfirmationPage;
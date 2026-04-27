import { Suspense } from "react";
import ResetPasswordContent from "@/components/reset-password/reset-password";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;

import { Suspense } from "react";
import VerificationContent from "@/components/verification/verificationContent";

const VerificationPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  );
};

export default VerificationPage;
import { Suspense } from "react";
import ProfileSetupContent from "@/components/user-registration/userRegistrationContent";

const ProfileSetupPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <ProfileSetupContent />
    </Suspense>
  );
};

export default ProfileSetupPage;
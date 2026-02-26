import MainContent from "@/components/user/profile/otherUserProfile/MainContent";
import Tag from "@/components/user/profile/otherUserProfile/Tag";
import { Suspense } from "react";

const OtherUserProfilePage = async ({
  params,
}: {
  params: Promise<{ otherUserId: string }>;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent params={params}>
        <Tag />
      </MainContent>
    </Suspense>
  );
};

export default OtherUserProfilePage;

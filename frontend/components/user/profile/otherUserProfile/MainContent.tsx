import ProfileSectionOther from "./ProfileSectionOther";
import { mockData } from "@/app/data/exploreMockData";
import { serverFetch } from "@/lib/serverFetch";
import { Profile } from "@/app/_types/author";
import DownloadCard from "../../shared/DownloadCard";

const MainContent = async ({
  params,
  children,
}: {
  params: Promise<{ otherUserId: string }>;
  children: React.ReactNode;
}) => {
  const { otherUserId } = await params;

  const profile = await serverFetch<Profile>(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/profile/${otherUserId}`,
  );
  console.log(profile);
  return (
    <>
      <ProfileSectionOther />
      {children}

      <section className="grid lg:px-6.25 grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
        {mockData.map((data) => (
          <DownloadCard data={data} />
        ))}
      </section>
    </>
  );
};

export default MainContent;

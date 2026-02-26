import { serverFetch } from "@/lib/serverFetch";
import MainDetails from "./MainDetails";
import ProfileCard from "./ProfileCard";
import PublicationDetails from "./PublicationDetails";
import Comments from "./Comments";
import { Document } from "@/app/_types/documents";
import { Profile } from "@/app/_types/author";

const PublicationContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [details, comments] = await Promise.all([
    serverFetch<Document>(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/documents/${id}`,
    ),
    serverFetch<Comment[]>(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/documents/${id}/comments`,
    ),
  ]);

  const profile = await serverFetch<Profile>(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/profile/${details.author.id}`,
  );

  return (
    <section className="flex relative flex-col md:flex-row gap-2">
      <MainDetails>
        <PublicationDetails details={details} />
        <Comments />
      </MainDetails>

      {/* side */}
      <ProfileCard profile={profile} />
    </section>
  );
};

export default PublicationContent;

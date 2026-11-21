import ExploreContent from "@/components/explore/exploreContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ExplorePage = async () => {
  const session = await getServerSession(authOptions);
  return <ExploreContent userId={session?.user?.id} />;
};

export default ExplorePage;

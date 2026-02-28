import { userPagesMetadata } from "@/app/data/Exports";
import AllForms from "@/components/user/settings/AllForms";
import SettingsHeader from "@/components/user/settings/SettingsHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { Bio } from "@/app/_types/author";

export const metadata = userPagesMetadata.settings;
const Page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let name = session?.user?.name || "";
  let image: string | null = session?.user?.image || null;
  let bio: Bio | null = null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        image: true,
        Profile: {
          take: 1,
          select: { bio: true },
        },
      },
    });

    if (user) {
      name = user.name || name;
      image = user.image;
      bio = (user.Profile[0]?.bio as Bio) ?? null;
    }
  }

  return (
    <main className="bg-white p-2 my-2 rounded md:mx-4 md:my-4 md:p-6 md:rounded-2xl">
      <SettingsHeader />
      <div className="lg:px-22.75 h-full md:space-y-20 py-4 lg:py-6">
        <AllForms profileData={{ name, image, bio }} />
      </div>
    </main>
  );
};

export default Page;

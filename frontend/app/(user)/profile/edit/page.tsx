import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/connection";
import { Bio } from "@/app/_types/author";
import { redirect } from "next/navigation";
import EditProfileForm from "@/components/user/profile/EditProfileForm";

export const metadata = {
  title: "Edit Profile | AcademiaHub",
};

const EditProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  let name = session.user.name || "";
  let image: string | null = session.user.image || null;
  let bio: Bio | null = null;

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

  return (
    <main className="bg-white p-4 my-2 rounded md:mx-4 md:my-4 md:p-6 md:rounded-2xl">
      <EditProfileForm profileData={{ name, image, bio }} />
    </main>
  );
};

export default EditProfilePage;

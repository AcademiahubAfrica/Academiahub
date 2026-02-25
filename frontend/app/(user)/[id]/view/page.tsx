import MainDetails from "@/components/user/documentView/MainDetails";
import ProfileCard from "@/components/user/documentView/ProfileCard";
export default function DocumentViewPage() {
  return (
    <main className="m-2 lg:mx-4  lg:px-4">
      <section className="flex relative flex-col lg:flex-row gap-2">
        <MainDetails />

        {/* side */}
        <ProfileCard />
      </section>
    </main>
  );
}

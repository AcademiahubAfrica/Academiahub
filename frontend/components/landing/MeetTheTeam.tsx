import { UserRoundGroup } from "lucide-react";
import { teamMembers } from "../team-members/MeetTheTeam";
import TeamCard from "../team-members/TeamCard";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const MeetTheTeam = () => {
  return (
    <section className=" py-15 container bg-linear-120 from-primary/15  from-5% to-20% to-[#F2F2F2]">
      <div className="max-w-300 text-center mx-auto  mb-9">
        <div className="flex items-center justify-center mb-6 md:mb-4.5 gap-1 text-primary">
          <UserRoundGroup size={14} />
          <h5 className="text-sm">The people behind AcademiaHub</h5>
        </div>
        <h3 className="md:text-[34px] md:font-semibold mb-4 leading-6 text-xl">
          Meet the team building the future of African academia
        </h3>
        <p className="text-[#999999] md:w-[60%] mx-auto text-sm leading-4.5 md:text-lg md:leading-5.5">
          Something short about the people working to make learning, teaching,
          and academic resources more accessible.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:grid-cols-4 xl:gap-4 mb-9">
        {[...teamMembers].splice(0, 4).map((member) => (
          <li key={member.id}>
            <TeamCard member={member} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <Link
          className={`${buttonVariants({ variant: "default" })} px-10  py-5 duration-150 ease-in-out transition-all max-md:w-full`}
          href={"/team"}
        >
          See all team member
        </Link>
      </div>
    </section>
  );
};

export default MeetTheTeam;

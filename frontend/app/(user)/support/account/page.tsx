import { AccountProfileLinks } from "@/app/data/Exports";
import Back from "@/components/user/shared/Back";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function Page() {
  return (
    <section className="">
      <Back />
      <div className="text-center mb-12.5 px-6">
        <h1 className="text-xl lg:text-4xl mb-5 font-semibold leading-6.75 md:leading-10 tracking-normal">
          Accounts & Profile
        </h1>
        <p className="text-sm lg:text-[16px] text-grey font-medium leading-4.5 tracking-normal">
          password reset, profile setup
        </p>
      </div>

      <div className="gap-4 flex flex-col">
        {AccountProfileLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className=" items-center inline-flex  gap-1 group"
          >
            {label}
            <MdOutlineKeyboardDoubleArrowRight className="text-primary-500 group-hover:translate-x-1 duration-150 transition-transform" />
          </Link>
        ))}
      </div>
    </section>
  );
}

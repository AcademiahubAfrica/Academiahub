import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { supportHelpData } from "@/app/data/Exports";

export default function SupportLinks() {
  return (
    <div className="flex flex-wrap gap-4 mb-20">
      {supportHelpData.map(({ icon: Icon, title, description, href }) => (
        <Link
          key={href}
          href={href}
          className="group flex-1 basis-[calc(50%-1rem)] md:basis-[calc(25%-1rem)] min-w-35 bg-white border-2 min-h-40 lg:h-50 shadow-xs rounded-2xl border-[#FAFAFA] flex p-4 flex-col items-center text-center justify-between transition-all hover:border-primary/20 hover:shadow-md"
        >
          <Icon
            size={28}
            className="shrink-0 text-black group-hover:text-primary transition-colors"
          />

          <div className="flex flex-col grow justify-center py-2">
            <h3 className="leading-tight mb-1 text-sm md:text-lg font-medium">
              {title}
            </h3>
            <p className="text-[11px] md:text-sm leading-snug text-grey">
              {description}
            </p>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1 text-sm font-medium text-black group-hover:underline">
              View
              <FaArrowRight
                size={12}
                className="transition-transform duration-200 group-hover:translate-x-1 opacity-75"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

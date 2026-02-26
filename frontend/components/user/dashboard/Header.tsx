import Image from "next/image";
import logoIcon from "@/public/assets/images/Aicon.png";
const Header = () => {
  return (
    <div className="h-40.75 hidden  w-full bg-linear-to-r from-primary-500! lg:flex justify-between to-primary-900">
      <h2 className="hero-text mt-5.5 ml-6.75 text-transparent bg-clip-text bg-linear-to-r from-white to-[#999999]">
        Discover academic research and projects{" "}
      </h2>

      <Image
        src={logoIcon}
        width={120}
        height={120}
        alt="academia hub's logo icon"
      />
    </div>
  );
};

export default Header;

import Link from "next/link";
import Image from "next/image";
const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={"/assets/images/logo.png"}
        alt="AcademiaHub logo"
        width={158}
        height={45}
      />
    </Link>
  );
};

export default Logo;

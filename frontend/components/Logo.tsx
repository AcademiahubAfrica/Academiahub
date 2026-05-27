import Link from "next/link";
import Image from "next/image";
const Logo = ({ href = "/" }: { href?: string }) => {
  return (
    <Link href={href}>
      <Image
        src={"/assets/images/logo.png"}
        alt="AcademiaHub logo"
        width={158}
        height={29}
        priority
      />
    </Link>
  );
};

export default Logo;

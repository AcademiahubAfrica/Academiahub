import { RiQuestionnaireLine } from "react-icons/ri";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <RiQuestionnaireLine className="text-4xl md:text-5xl lg:text-7xl" />
      <p>Help & Support</p>
      <a href="mailto:academiahub@gmail.com">
        Need help? Contact us at Academiahubafrica@gmail.com
      </a>
    </div>
  );
};

export default page;

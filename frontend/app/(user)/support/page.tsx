import { RiQuestionnaireLine } from "react-icons/ri";

const page = () => {
  return (
    <div className="flex flex-col h-full mb-2 bg-white rounded-2xl mt-2 lg:mt-6 lg:mx-6 items-center justify-center text-center px-2 gap-4">
      <RiQuestionnaireLine className="text-4xl md:text-5xl lg:text-7xl" />
      <p>Help & Support</p>
      <a href="mailto:academiahub@gmail.com">
        Need help? Contact us at Academiahubafrica@gmail.com
      </a>
    </div>
  );
};

export default page;

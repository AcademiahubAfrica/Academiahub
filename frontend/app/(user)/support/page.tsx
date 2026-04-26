import PageName from "@/components/user/shared/PageName";
import SupportLinks from "@/components/user/support/SupportLinks";

const page = () => {
  return (
    <>
      <PageName />
      <div className="">
        <div className="text-center mt-4 md:mt-0 mb-12.5 px-6">
          <h1 className="text-xl lg:text-4xl font-semibold leading-6.75 md:leading-10 tracking-normal">
            How can we help you?
          </h1>
          <p className="text-sm lg:text-[16px] font-medium leading-4.5 tracking-normal">
            Manage your accounts, or get in touch with our support team
          </p>
        </div>

        <SupportLinks />
      </div>
    </>
  );
};

export default page;

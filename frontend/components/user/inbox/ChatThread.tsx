import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";

const ChatThread = () => {
  return (
    <section className="border  border-grey rounded-tr-[15px]">
      <div className="hidden md:block">
        <ChatHeader />
      </div>
      <MessageList />
    </section>
  );
};

export default ChatThread;

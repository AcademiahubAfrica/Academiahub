import { getMessageSeparator } from "@/lib/utils";
import MessageBubble from "./MessageBubble";

const messages = [
  {
    id: 1,
    date: "2025-02-18T13:45:00.000Z",
    ownMessage: true,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 2,
    date: "2025-11-18T16:45:00.000Z",
    ownMessage: false,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 3,
    date: "2026-02-18T13:45:00.000Z",
    ownMessage: true,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 4,
    date: "2026-02-18T13:45:00.000Z",
    ownMessage: false,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 5,
    date: "2026-02-18T13:45:00.000Z",
    ownMessage: true,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 6,
    date: "2026-02-18T13:45:00.000Z",
    ownMessage: false,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 7,
    date: "2026-02-18T13:45:00.000Z",
    ownMessage: true,
    message: "I like how simplified it was , very straight to the point.",
  },
  {
    id: 8,
    date: new Date().toISOString(),
    ownMessage: false,
    message: "yes",
  },
];
function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {messages.map((message, index) => {
        const dateLabel = getMessageSeparator(message.date);
        const prevDateLabel =
          index > 0 ? getMessageSeparator(messages[index - 1].date) : null;

        // Only show the separator if it's the first message or date changed
        const showSeparator = dateLabel !== prevDateLabel;

        return (
          <div key={message.id}>
            {showSeparator && (
              <div className="flex justify-center my-6">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full uppercase font-semibold">
                  {dateLabel}
                </span>
              </div>
            )}
            <MessageBubble message={message} />
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;

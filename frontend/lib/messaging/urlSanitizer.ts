export default function parseMessageContent(
  text: string,
): Array<{ type: "text" | "link"; value: string }> {
  const urlRegex = /(https:\/\/[^\s]+)/g;

  const parts = text.split(urlRegex);
  console.log(parts);

  return parts
    .filter((part) => part.length > 0)
    .map((part) => {
      const isLink = urlRegex.test(part);
      return {
        type: isLink ? "link" : "text",
        value: part,
      };
    });
}

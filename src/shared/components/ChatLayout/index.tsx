import React from "react";

type ChatLayoutProps = {
  children: React.ReactNode;
};
const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div className="w-full max-h-dvh h-full flex flex-col overflow-x-hidden">{children}</div>;
};

export default ChatLayout;

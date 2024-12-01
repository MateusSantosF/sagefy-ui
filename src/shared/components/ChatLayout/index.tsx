import React from "react";

type ChatLayoutProps = {
  children: React.ReactNode;
};
const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div className="w-full h-screen flex flex-col overflow-x-hidden">{children}</div>;
};

export default ChatLayout;

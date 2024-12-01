import { UserMetadataProvider } from "@/shared/contexts/UserMetadataContext";
import { ChatMessagesProvider } from "@/shared/hooks/useChatMessages";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";

dayjs.locale("pt-br");

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <AntdRegistry>
      <ConfigProvider>
        <UserMetadataProvider>
          <ChatMessagesProvider>{children}</ChatMessagesProvider>
        </UserMetadataProvider>
      </ConfigProvider>
    </AntdRegistry>
  );
}

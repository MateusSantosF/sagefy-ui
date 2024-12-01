import { InterfacePropsProvider } from "@/shared/contexts/InterfacePropsContext";
import { Suspense } from "react";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <Suspense>
      <InterfacePropsProvider>{children}</InterfacePropsProvider>
    </Suspense>
  );
}
export default Layout;

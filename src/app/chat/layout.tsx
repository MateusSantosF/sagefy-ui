import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Chat - Sagefy",
  description: "Sagefy",
};


function Layout({ children }: React.PropsWithChildren) {
  return (
    <Suspense>
      {children}
    </Suspense>
  );
}
export default Layout;

import '../css/common.css'
import type { Metadata } from "next";
import ReduxStoreProvider from "@/components/ReduxStoreProvider";
import LayoutProvider from "@/components/LayoutProvider";


export const metadata: Metadata = {
  title: "Rental Car App",
  description: "Rental Car App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxStoreProvider>
      <LayoutProvider>
        {children}
        </LayoutProvider>
      </ReduxStoreProvider>
  );
}

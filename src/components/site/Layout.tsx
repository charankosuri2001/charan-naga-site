import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

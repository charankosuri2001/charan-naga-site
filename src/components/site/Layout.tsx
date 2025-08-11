import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main id="main" className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;

import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Header from "./Header";

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <Fragment>
      <div className="fixed right-0 z-10 left-[90px] bg-background">
        <Header />
      </div>
      <Navbar />
      <div className=" pointer-events-auto flex-1 relative mt-24 p-6 ml-[90px]">
        {children}
      </div>
    </Fragment>
  );
};

export default Layout;

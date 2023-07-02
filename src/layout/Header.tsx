import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Avatar from "../../public/Avatar.svg";
const Header = () => {
  const [headerName, setHeaderName] = useState("");
  const { pathname } = useLocation();

  const getPathName = (pathname: string) => {
    switch (pathname) {
      case "/":
        return setHeaderName("İdarəetmə Paneli");

      case "/references":
        return setHeaderName("References");

      case "/control-panel/deals":
        return setHeaderName("Sifarişlər");
      case "/sos":
        return setHeaderName("Sos bildirişləri");
      default:
        return setHeaderName("");
    }
  };

  useEffect(() => {
    getPathName(pathname);
  }, [pathname]);
  return (
    <div className="flex items-center justify-between w-full h-24 px-12 border-b border-line">
      <h1 className="text-2xl font-bold text-dark">{headerName}</h1>
      <div className="object-cover">
        <img src={Avatar} className="w-12 h-12 rounded-full" alt="" />
      </div>
    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { NavigationTop, SideMenu } from "./Navigation.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const goBack = () => {
    window.history.back();
  }

  useEffect(() => {
    setIsActive(false)
  }, [location])

  return (
    <>
      <NavigationTop>
        <FontAwesomeIcon type="button" onClick={goBack} icon={solid("chevron-left")} />
        <FontAwesomeIcon onClick={toggleActive} icon={solid("bars")} />
      </NavigationTop>
      <SideMenu className={isActive ? "active" : ""}>
        <div className="text-right">
          <FontAwesomeIcon onClick={toggleActive} icon={solid("remove")} />
        </div>

        <div className="text-center nav-link-div">
          <Link to="/">Pretraga</Link>
          <Link to="/upload">Unos</Link>
          <Link to="/Workflow">Radni zadaci</Link>
        </div>
        <div className="text-center">
          Odjavi se{" "}
          <FontAwesomeIcon onClick={toggleActive} icon={solid("sign-out")} />
        </div>
      </SideMenu>
    </>
  );
};

export default Navigation;

import { Link } from "react-router-dom";
import { NavigationTop, SideMenu } from "./Navigation.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useState } from "react";

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  function goBack() {
    window.history.back();
  }
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

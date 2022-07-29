import { useEffect, useState } from "react";
import Nav from "../Nav";
import LanguageSelection from "../LanguageSelection";
import "./index.sass";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/loginStatusSlice";
import { useTranslation } from "react-i18next";
const Header = (props: any) => {
  const { t } = useTranslation();
  const [state, setState]: any = useState({
    position: window.scrollY,
    isScrollUp: true,
  });
  const loginStatus = useSelector((state: any) => state.loginStatus);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    const handleScroll = (event: any) => {
      const scrollTop = event.srcElement.scrollingElement.scrollTop;
      setState({
        position: scrollTop,
        isScrollUp: scrollTop < state.position,
      });
    };
    window.addEventListener("scroll", handleScroll);
  }, [state]);

  const logoutFunc = (): void => {
    const action = logout(loginStatus);
    dispatch(action);
    props.navigate("/");
  };

  return (
    <div
      className={`header text-white ${!state?.isScrollUp ? "not-active" : ""} ${
        state.position > 60 ? "static" : ""
      }`}
    >
      <div className="container d-flex">
        <div className="header__center">
          <Nav />
        </div>
        <div className="header__right">
          <a
            className="logout"
            href="/#"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              logoutFunc();
            }}
          >
            {t("COMMON.LOGOUT")}
          </a>
          <LanguageSelection />
        </div>
      </div>
    </div>
  );
};

export default Header;

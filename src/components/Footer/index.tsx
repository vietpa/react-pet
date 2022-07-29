import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import facebook from "../../assets/images/facebook.png";
import twitter from "../../assets/images/twitter.png";
import linkedin from "../../assets/images/linkedin.png";
import { APP_CONSTANTS } from "../../utils/constant";

import "./index.sass";
const Footer = (props: any) => {
  const data = APP_CONSTANTS.FOOTER_MENU;
  const [state, setState]: any = useState({
    position: window.scrollY,
    isScrollUp: true,
    menu: data,
  });

  useEffect(() => {
    const handleScroll = (event: any) => {
      const scrollTop = event.srcElement.scrollingElement.scrollTop;
      setState({
        position: scrollTop,
        isScrollUp: scrollTop < state.position,
        menu: data,
      });
    };
    window.addEventListener("scroll", handleScroll);
  }, [data, state]);

  return (
    <div
      className={props.noBg ? "footer text-white" : "footer text-white has-bg"}
    >
      <div className="container">
        <div className="footer__nav">
          <ul className="nav">
            {(() => {
              return data.map((item: any) => {
                return (
                  <li className="nav__item" key={item.name}>
                    <div className="fsc-4-5 font-bold mb-3">{item.name}</div>
                    {(() => {
                      return item.children.map((child: string) => (
                        <div className="mb-3" key={child}>
                          {child}
                        </div>
                      ));
                    })()}
                  </li>
                );
              });
            })()}
            <li className="nav__item social-networks">
              <div className="fsc-4-5 font-bold mb-3">SOCIAL</div>
              <ul>
                <li>
                  <a href="/#">
                    <img src={twitter} alt="" />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <img src={facebook} alt="" />
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <img src={linkedin} alt="" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <hr />
        <div className="footer__copyright">
          <div className="footer__copyright-left">
            <div>
              <img className="logo" src={logo} alt="" />
            </div>
            <span>
              Copyright © 2018-2022 TJTECH Company S.L. All rights reserved.
            </span>
          </div>
          <ul className="footer__copyright-right social-networks">
            <li>
              <a href="/#">
                <img src={twitter} alt="" />
              </a>
            </li>
            <li>
              <a href="/#">
                <img src={facebook} alt="" />
              </a>
            </li>
            <li>
              <a href="/#">
                <img src={linkedin} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

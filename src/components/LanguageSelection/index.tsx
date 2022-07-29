import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./index.sass";
import { useTranslation } from "react-i18next";

const LanguageSelection = (props: any) => {
  const [data, setData]: any = useState();
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage('en');
    setData("English");
  }, []);

  const languageChanged = (lang: string, code: string) => {
    setData(lang);
    i18n.changeLanguage(code);
  };

  return (
    <div className="language-selection">
      <NavDropdown title={data || ""} align="end">
        <Dropdown.Item onClick={() => languageChanged("English", "en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => languageChanged("German", "de")}>
          German
        </Dropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default LanguageSelection;

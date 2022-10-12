import { ReactComponent as LogoImage } from "../../assets/vector.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import css from "./Header.module.scss";

function Header() {
  return (
    <header className={css.header}>
      <div className={css.currencyBoxes}>
        <div className={css.boxWithLogo}>
          <LogoImage className={css.logoImage} />
          <Logo className={css.logo} />
        </div>
        <div className={css.boxes}> </div>
      </div>
    </header>
  );
}

export default Header;

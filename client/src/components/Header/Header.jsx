import { useState } from "react";
import { ReactComponent as LogoImage } from "../../assets/vector.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import getSocket from "../../socket";

import css from "./Header.module.scss";

function Header() {
  const socket = getSocket();

  const [time, setTime] = useState('');

  function handleSubmit() {
    socket.emit("changeDelay", time);
  }

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <header className={css.header}>
      <div className={css.currencyBoxes}>
        <div className={css.boxWithLogo}>
          <LogoImage />
          <Logo />
        </div>
        <div>
          <label className={css.label}>Update interval</label>
          <input
            type="number"
            value={time}
            onChange={handleChange}
            name="delay"
          />
          <button type="button" onClick={handleSubmit} className={css.button}>
            Update
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;

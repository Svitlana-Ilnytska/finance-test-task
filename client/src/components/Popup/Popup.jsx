import { useState } from "react";
import { useGetFinanceQuery } from "../../redux/financeApi";
import css from "./Popup.module.scss";

function Popup({ active, setActive, addFinance }) {
  const [ticker, setTicker] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { data: items } = useGetFinanceQuery();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "ticker":
        setTicker(value);
        break;

      case "displayName":
        setDisplayName(value);
        break;

      default:
        console.warn(`nameTicker - ${name} not matched`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicker = {
      ticker,
      displayName,
    };

    const theSameTicker = items.some((item) =>
      item.ticker.toLowerCase().includes(newTicker.ticker.toLowerCase())
    );

    if (theSameTicker)
      return alert(`${newTicker.displayName}  is already in list.`);

    addFinance(newTicker);
    setTicker("");
    setDisplayName("");
    setActive(false);
  };

  return (
    <div
      className={active ? `${css.modal} ${css.active}` : `${css.modal}`}
      onClick={() => setActive(false)}
    >
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className={css.form}>
          <h2 className={css.title}>Add ticker</h2>
          <label className={css.label}>Ticker</label>
          <input
            type="text"
            value={ticker}
            onChange={handleChange}
            name="ticker"
            className={css.input}
            required
          />
          <label className={css.label}>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={handleChange}
            name="displayName"
            className={css.input}
            required
          />
          <button type="submit" className={css.button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;

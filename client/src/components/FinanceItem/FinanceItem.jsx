import React from "react";
import PropTypes from "prop-types";

import css from "./FinanceItem.module.scss";

const financeMap = new Map([
  ["AAPL", "Apple"],
  ["GOOGL", "Alphabet"],
  ["MSFT", "Microsoft"],
  ["AMZN", "Amazon"],
  ["FB", "Facebook"],
  ["TSLA", "Tesla"],
]);

const FinanceItem = ({
  ticker,
  price,
  change,
  change_percent,
  onDeleteItem,
}) => {
  const getFinanceName = (ticker) => {
    return financeMap.get(ticker);
  };

  return (
    <>
      <p className={css.block}>
        <span>{getFinanceName(ticker)}:</span> <span>{price} &#36; </span>
        <span>{change} &#36;</span>  <span>{change_percent} &#37;</span>
      </p>

      <button type="button" onClick={onDeleteItem} className={css.button}>
        Delete
      </button>
    </>
  );
};

FinanceItem.propTypes = {
  ticker: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func,
};

export default FinanceItem;

import { useState } from "react";
import { ReactComponent as DeleteButton } from "../../assets/minus.svg";
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
  onDeleteFinance,
}) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const getFinanceName = (ticker) => {
    return financeMap.get(ticker);
  };

  return (
    <>
      <div className={css.block}>
        <span>{getFinanceName(ticker)} :</span> <span>{price} &#36; </span>
        <span>{change} &#36;</span> <span>{change_percent} &#37;</span>
        <div
          className={css.tooltipWrapper}
          onMouseEnter={showTip}
          onMouseLeave={hideTip}
        >
          <button
            type="button"
            onClick={onDeleteFinance}
            className={css.button}
          >
            <DeleteButton />
          </button>
          {active && (
            <div className={`${css.tooltip} ${css.right}`}>Remove</div>
          )}
        </div>
      </div>
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

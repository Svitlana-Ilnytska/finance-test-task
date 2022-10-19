import { useState } from "react";
import { ReactComponent as DeleteButton } from "../../assets/minus.svg";
import PropTypes from "prop-types";

import css from "./FinanceItem.module.scss";

const FinanceItem = ({
  price,
  change,
  change_percent,
  displayName,
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

  return (
    <div className={css.block}>
      <span>{displayName} :</span> <span>{price} &#36; </span>
      <span>{change} &#36;</span> <span>{change_percent} &#37;</span>
      <div
        className={css.tooltipWrapper}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
      >
        <button type="button" onClick={onDeleteFinance} className={css.button}>
          <DeleteButton />
        </button>
        {active && <div className={`${css.tooltip} ${css.right}`}>Remove</div>}
      </div>
    </div>
  );
};

FinanceItem.propTypes = {
  displayName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  change_percent: PropTypes.string.isRequired,
  onDeleteItem: PropTypes.func,
};

export default FinanceItem;

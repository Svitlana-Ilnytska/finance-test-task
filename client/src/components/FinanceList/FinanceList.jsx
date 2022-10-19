import React, { useState } from "react";
import FinanceItem from "../FinanceItem/FinanceItem";
import {
  useGetFinanceQuery,
  useRemoveFinanceMutation,
  useAddFinanceMutation,
} from "../../redux/financeApi";
import Popup from "../Popup/Popup";
import { ReactComponent as AddButton } from "../../assets/plus.svg";

import css from "./FinanceList.module.scss";

const FinanceList = () => {
  const [popupActive, setPopupActive] = useState(false);

  const { data: items } = useGetFinanceQuery();

  const [removeFinance] = useRemoveFinanceMutation();
  const [addFinance] = useAddFinanceMutation();

  const handleClick = () => {
    setPopupActive(true);
  };

  return (
    <div>
      <button type="button" onClick={handleClick} className={css.button}>
        <AddButton /> Add new ticker
      </button>

      <ul className={css.list}>
        {items?.map((item) => (
          <li key={item.ticker} className={css.item}>
            <FinanceItem
              {...item}
              onDeleteFinance={() => removeFinance(item.ticker)}
            />
          </li>
        ))}
      </ul>

      <Popup
        active={popupActive}
        setActive={setPopupActive}
        addFinance={addFinance}
      />
    </div>
  );
};

export default FinanceList;

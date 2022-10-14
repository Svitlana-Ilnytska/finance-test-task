import React from "react";
import FinanceItem from "../FinanceItem/FinanceItem";
import { useGetFinanceQuery, useRemoveFinanceMutation } from "../../redux/financeApi";
import css from './FinanceList.module.scss'

const FinanceList = () => {

  const { data: items } = useGetFinanceQuery();

  const [removeFinance] = useRemoveFinanceMutation();
  
  return (
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
  );
};

export default FinanceList;

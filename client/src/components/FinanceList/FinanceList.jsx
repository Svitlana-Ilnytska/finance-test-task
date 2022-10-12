import React from "react";
import FinanceItem from "../FinanceItem/FinanceItem";

import css from './FinanceList.module.scss'

const FinanceList = ({ data }) => {
  //   const { data: items } = useFetchContactsQuery();
  // const {data} = items;
  return (
    <ul>
      {data?.map((item) => (
        <li key={item.ticker} className={css.item}>
          <FinanceItem
            {...item}
            onDeleteContact={() => ({})}
            // onDeleteItem={() => onDeleteItem(item.ticker)}
          />
        </li>
      ))}
    </ul>
  );
};

export default FinanceList;

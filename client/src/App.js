import { useGetFinanceQuery } from "./redux/financeApi";

import  FinanceList from "./components/FinanceList/FinanceList";
import  Header from "./components/Header/Header";

import "./App.css";

function App() {
  const { data } = useGetFinanceQuery();

  return (
    <div>
      <Header />
      <FinanceList data={data} />
    </div>
  );
}

export default App;

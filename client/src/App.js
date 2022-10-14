import FinanceList from "./components/FinanceList/FinanceList";
import Header from "./components/Header/Header";

import css from "./App.module.scss";

function App() {
  return (
    <div>
      <Header />
      <div className={css.main}>
        <FinanceList />
      </div>
    </div>
  );
}

export default App;

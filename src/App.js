import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Counter from "./containers/Counter/Counter";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/Patients/Patients";
import { configureStore } from "./redux/store";

function App() {
  let store = configureStore();

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route path={"/medicines"} exact component={Medicines} />
            <Route path={"/patients"} exact component={Patients} />
            <Route path={"/counter"} exact component={Counter} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;

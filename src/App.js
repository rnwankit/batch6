import { ThemeProvider } from "@mui/system";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./components/Layout/Layout";
import Counter from "./containers/Counter/Counter";
import PromisesExample from "./containers/Examples/PromisesExample";
import UseCallbackExample from "./containers/Examples/UseCallbackExample";
import UseMemoExample from "./containers/Examples/UseMemoExample";
import Medicines from "./containers/Medicines/Medicines";
import Patients from "./containers/Patients/Patients";
import { configureStore } from "./redux/store";

function App() {
  let { store, persistor } = configureStore();

  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Switch>
                <Route path={"/medicines"} exact component={Medicines} />
                <Route path={"/patients"} exact component={Patients} />
                <Route path={"/counter"} exact component={Counter} />
                <Route path={"/PromisesExample"} exact component={PromisesExample} />
                <Route path={"/UseMemoExample"} exact component={UseMemoExample} />
                <Route path={"/UseCallbackExample"} exact component={UseCallbackExample} />
              </Switch>
            </Layout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;

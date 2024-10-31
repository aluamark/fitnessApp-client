import Provider from "./Provider";
import Router from "./Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider>
      <Router />
      <Toaster position="bottom-right" />
    </Provider>
  );
}

export default App;

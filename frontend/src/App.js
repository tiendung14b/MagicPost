import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

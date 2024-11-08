import { Outlet } from "react-router-dom";

import "@/App.scss";

function App() {
  return (
    <div id="ApplicationNameWrapper">
      <Outlet />
    </div>
  );
}

export default App;

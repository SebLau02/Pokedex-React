import { Routes, Route } from "react-router-dom";
import "./App.css";

import Pokemon from "./component/pokemon";
import Home from "./component/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;

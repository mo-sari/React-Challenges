import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FOLDER, PAGINATION } from "./components";
import { Home } from "./Home";
import { explorer } from "./datas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders" element={<FOLDER explorer={explorer} />} />
        <Route path="/paggination" element={<PAGINATION />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

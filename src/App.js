import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  FOLDER,
  PAGINATION,
  CALCULATOR,
  PASSWORD,
  PROGRESSBAR,
} from "./components";
import { Home } from "./Home";
import { explorer } from "./datas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folders" element={<FOLDER explorer={explorer} />} />
        <Route path="/paggination" element={<PAGINATION />} />
        <Route path="/calculator" element={<CALCULATOR />} />
        <Route path="/password-gen" element={<PASSWORD />} />
        <Route path="/progress-bar" element={<PROGRESSBAR value={10} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

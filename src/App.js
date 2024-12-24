import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CHALLENGE_1_FOLDER } from "./components";
import { Home } from "./Home";
import { explorer } from "./datas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/folders"
          element={<CHALLENGE_1_FOLDER explorer={explorer} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

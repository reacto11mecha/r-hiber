import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/routes/Home";
import { Viewer } from "@/routes/Viewer";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="viewer" element={<Viewer />} />
    </Routes>
  </BrowserRouter>
);

export default App;

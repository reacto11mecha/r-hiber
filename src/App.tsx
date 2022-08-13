import { HashRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/routes/Home";
import { Viewer } from "@/routes/Viewer";

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="viewer" element={<Viewer />} />
    </Routes>
  </HashRouter>
);

export default App;

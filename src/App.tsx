import { HashRouter, Routes, Route } from "react-router-dom";

import { Home } from "@/routes/Home";
import { Viewer } from "@/routes/Viewer";

function NotFound() {
  return <h1>Not Found</h1>;
}

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="viewer" element={<NotFound />} />
      <Route path="viewer/:usbPath" element={<Viewer />} />
    </Routes>
  </HashRouter>
);

export default App;

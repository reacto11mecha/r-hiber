import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Komponen
import Sidebar from "@/components/Sidebar";

// Halaman-Halaman
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Visualization from "@/pages/Visualization";
import Telemetry from "@/pages/Telemetry";

function App() {
  return (
    <>
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="telemetry" element={<Telemetry />} />
          <Route path="visualization" element={<Visualization />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Komponen
import Sidebar from "@/components/Sidebar";

// Halaman-Halaman
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Visualizer from "@/pages/Visualizer";
import Telemetry from "@/pages/Telemetry";

function App() {
  return (
    <>
      <Sidebar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="visualizer" element={<Visualizer />} />
          <Route path="telemetry" element={<Telemetry />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

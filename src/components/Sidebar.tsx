import Styles from "@/styles/components/Sidebar.module.css";
import { useMatch, useResolvedPath, Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

interface ItemInterface {
  name: string;
  to: string;
}

const items: ItemInterface[] = [
  {
    name: "Beranda",
    to: "/",
  },
  {
    name: "Pengaturan",
    to: "/settings",
  },
  {
    name: "Telemetri",
    to: "/telemetry",
  },
  {
    name: "Visualisasi",
    to: "/visualizer",
  },
];

function Sidebar() {
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${Styles.sidebar}`}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">HIBER</span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {items.map((item) => (
          <ChildLink to={item.to} key={item.to}>
            {item.name}
          </ChildLink>
        ))}
      </ul>
    </div>
  );
}

function ChildLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <li className={match ? "nav-item" : ""}>
      <Link
        to={to}
        className={`nav-link ${match ? "active" : "text-white"}`}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;

import "@fontsource/poppins/700.css";

import Styles from "@/styles/components/Sidebar.module.css";
import { useMatch, useResolvedPath, Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import classNames from "classnames";

interface ItemInterface {
  name: string;
  icon: string;
  to: string;
}

const items: ItemInterface[] = [
  {
    name: "Beranda",
    icon: "bi-house",
    to: "/",
  },
  {
    name: "Pengaturan",
    icon: "bi-gear",
    to: "/settings",
  },
  {
    name: "Telemetri",
    icon: "bi-file-bar-graph",
    to: "/telemetry",
  },
  {
    name: "Visualisasi",
    icon: "bi-send",
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
        <span className={`fs-4 ${Styles.header}`}>HIBER</span>
      </Link>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        {items.map((item) => (
          <ChildLink to={item.to} key={item.to}>
            <i className={`bi ${item.icon}`} style={{ width: "1em" }}></i>{" "}
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
    <li className={classNames({ "nav-item": match })}>
      <Link
        to={to}
        className={classNames("nav-link", {
          active: match,
          "text-white": !match,
        })}
        {...props}
      >
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;

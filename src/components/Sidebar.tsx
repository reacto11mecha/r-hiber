function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "17em" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">HIBER</span>
      </a>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="/" className="nav-link active">
            Home
          </a>
        </li>
        <li>
          <a href="/" className="nav-link text-white">
            Hello
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

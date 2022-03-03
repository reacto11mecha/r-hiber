import { Row, Col } from "react-bootstrap";
import Styles from "@/styles/pages/Settings.module.css";

import ArduinoPort from "@/components/ArduinoPort";
import FileSave from "@/components/FileSave";

function Settings() {
  return (
    <>
      <Row className="mt-3 p-3">
        <Col>
          <h2 className="heading-page">Pengaturan</h2>
        </Col>
      </Row>
      <Row className={Styles.rowSetting}>
        <Col>
          <ArduinoPort />
        </Col>

        <Col>
          <FileSave />
        </Col>
      </Row>
      <Row className={Styles.rowSetting}>
        <Col></Col>

        <Col></Col>
      </Row>
    </>
  );
}

export default Settings;

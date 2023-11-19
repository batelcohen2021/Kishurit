import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { isMobile } from "react-device-detect";

const jumbotronCss = `text-center bg-light rounded ${
  isMobile ? "p-1 pb-3" : "p-3 pt-1 pb-2"
}`;

const WelcomeJumbotron = () => {
  return (
    <div className={jumbotronCss}>
      <Row>
        <Col>
          <h1 className="display-4 text-center title">אתר קישורית</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="lead text-right mt-3">
          ברוכים הבאים לאתר קישורית. כאן תוכלו למצוא מגוון רחב של בעלי מקצועות ועסקים: טכנאים, אינסטלטורים, ספרים, נותנות שירות בתחום היופי והטיפוח, מורים פרטיים ועוד...
מטרת האתר לעזור לאנשים שפרנסתם נפגעה בזמן המלחמה, לרבות מפונים מביתם. 
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeJumbotron;

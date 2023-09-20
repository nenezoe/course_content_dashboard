import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ProductUpload from '../assets/images/product-upload.svg';
import CourseUpload from '../assets/images/course-upload.svg';
import { Link } from 'react-router-dom';
import {
  CartPlus,
  ClockHistory,
  CloudUpload,
  CloudUploadFill,
  GraphUpArrow,
} from 'react-bootstrap-icons';

function Dashboard() {
  return (
    <Container className="">
      <div className="">
        <h1 className="text-default text-primary text-start my-5">Welcome</h1>
      </div>
      <Row>
        <Col md={6}>
          <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
            <Card.Body>
              <Card.Title className="text-primary">
              <Link className="link nav-item" to="/product-upload">
                <CartPlus size={30} />

                <span style={{ margin: '0px 0px 0px 20px' }}>
                  Product Upload
                </span>
                </Link>
              </Card.Title>

              <Card.Text>
                Upload a new product to the store for users to see and buy on
                the HealthGO app.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
            <Card.Body>
              <Card.Title className="text-primary">
              <Link className="link nav-item" to="/upload/course">
                <CloudUploadFill size={30} />

                <span style={{ margin: '0px 0px 0px 20px' }}>
                  Course Upload
                </span>
                </Link>
              </Card.Title>
              <Card.Text>
                Upload a new product to the store for users to see and buy on
                the HealthGO app.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={6}>
          <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
            <Card.Body>
              <Card.Title className="text-primary">
                <ClockHistory size={30} />

                <span style={{ margin: '0px 0px 0px 20px' }}>
                  Course Upload
                </span>
              </Card.Title>

              <Card.Text>
                Upload a new product to the store for users to see and buy on
                the HealthGO app.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={6}>
          <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
            <Card.Body>
              <Card.Title className="text-primary">
                <GraphUpArrow size={30} />

                <span style={{ margin: '0px 0px 0px 20px' }}>Analytics</span>
              </Card.Title>

              <Card.Text>
                Upload a new product to the store for users to see and buy on
                the HealthGO app.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

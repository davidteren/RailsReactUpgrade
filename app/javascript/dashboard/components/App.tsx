import React from "react"
import { Container, Row, Col, Card, Alert} from "react-bootstrap"
import CustomForm  from  "./DashboardForm"
// import { App } from "@/components/ReactLoader"

const Dashboard = () => {
  // Hardcoded data for the list widget
  const dataList = [
    { id: 1, name: "Item 1", value: "This is item 1" },
    { id: 2, name: "Item 2", value: "This is item 2" },
  ]

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="mb-3" >
            <Card.Body className="secondary">
              <Card.Title>Welcome Widget</Card.Title>
              <Card.Text>
                Welcome to your dashboard! Here's a simple React Bootstrap dashboard.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Data List Widget</Card.Title>
              <ul>
                {dataList.map(item => (
                  <li key={item.id}>{item.name}: {item.value}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
     <CustomForm/>
      <Alert variant="primary">
        A simple primary alert — check it out!
      </Alert>
      <Alert variant="secondary">
        A simple secondary alert — check it out!
      </Alert>
      <Alert variant="success">
        A simple success alert — check it out!
      </Alert>
      <Alert variant="danger">
        A simple danger alert — check it out!
      </Alert>
      <Alert variant="warning">
        A simple warning alert — check it out!
      </Alert>
      <Alert variant="info">
        A simple info alert — check it out!
      </Alert>
    </Container>
  )
}

export default Dashboard

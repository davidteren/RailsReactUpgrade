import React from "react"
import { Form, Button } from "react-bootstrap"

const CustomForm = () => (
    <Form>
      <Form.Group id="frameworks" className="mb-3">
        <Form.Label>Example select</Form.Label>
        <Form.Select>
          <option defaultValue>Open this select menu</option>
          <option>One</option>
          <option>Two</option>
          <option>Three</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" className="m-1">Submit</Button>
    </Form>
  )

export default CustomForm

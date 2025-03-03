import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("You are not logged in. Please log in to view your orders.");
        setLoading(false);
        return;
      }

      const userId = JSON.parse(storedUser)?._id;
      if (!userId) {
        setError("Invalid user ID. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://claynest-back.onrender.com/order/getorders/${userId}`);
        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">You have no orders yet.</Alert>
      ) : (
        <Row>
          <Col xs={12}>
            {/* 📌 Scrollable table on small screens */}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.status}</td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => alert(`Details for Order ID: ${order._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
    <footer className="footer">
        <Container>
          <Row className="justify-content-center text-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <p>&copy; {new Date().getFullYear()} ClayNest. All Rights Reserved.</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><MailOutlineIcon fontSize="small" /> claynest@gmail.com</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><LocalPhoneIcon fontSize="small" /> 8606454877</p>
            </Col>
          </Row>
        </Container>
      </footer>
      </>
  );
};

export default MyOrders;

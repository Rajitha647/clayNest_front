import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './contact.css'; // Optional CSS for additional styling

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required.';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            errors.email = 'A valid email is required.';
        if (!formData.subject.trim()) errors.subject = 'Subject is required.';
        if (!formData.message.trim()) errors.message = 'Message is required.';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        }
    };

    return (
        <section className="contact-section py-5">
            <Container className='contact'>
                <h2 className="text-center mb-4">Contact Us</h2>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form onSubmit={handleSubmit} noValidate>
                            {successMessage && (
                                <div className="alert alert-success text-center">
                                    {successMessage}
                                </div>
                            )}
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formSubject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter the subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.subject}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.subject}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Write your message here"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    isInvalid={!!formErrors.message}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center">
        <Button variant="" type="submit" className="btn-msg">
            Send Message
        </Button>
    </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Contact;

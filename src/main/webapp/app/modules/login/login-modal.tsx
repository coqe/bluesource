import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  // showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <div className="login-container">
      <AvForm onSubmit={this.handleSubmit}>
            <Row>
              <Col md="12">
                {loginError ? (
                  <Alert color="danger">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </Alert>
                ) : null}
              </Col>
              <Col md="12">
                <AvField
                  name="username"
                  label="Username"
                  placeholder="Your username"
                  required
                  errorMessage="Username cannot be empty!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Your password"
                  required
                  errorMessage="Password cannot be empty!"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> Remember me
                  </Label>
                </AvGroup>
              </Col>
            </Row>
            <Button className="login-button" color="primary" type="submit">
              Sign in
            </Button>
            <div className="mt-1">&nbsp;</div>
            <div className="login-options">
              <div className="login-option"><Link to="/reset/request">Did you forget your password?</Link></div>
              <div className="login-option"><span>You don't have an account yet?</span> <Link to="/register">Register a new account</Link></div>
            </div>

        </AvForm>
      </div>
    );
  }
}

export default LoginModal;

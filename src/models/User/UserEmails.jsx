import React from 'react';
import { renderToString } from 'react-dom/server';

class _TestEmail extends React.Component {
  render() {
    return (
      <div>
        <p>This is a test email.</p>

        <p>
          If you feel you have received this message in error, you
          may <a href="%unsubscribe_url%">unsubscribe</a> from any future communication.
        </p>
      </div>
    )
  }
}

class _ConfirmationEmail extends React.Component {
  render() {
    const user = this.props.user;
    const url = process.env.BASE_URL + `/auth/confirm/${user.confirmation_token}`

    return (
      <div>
        <p>
          Dear { user.first_name},
        </p>

        <p>
          Thank you for your registration with OpenCircuit.
          You must click the link below to complete the process and activate your user account.
        </p>

        <p>
          <a href={ url }>
            Click here to complete your registration.
          </a>
        </p>

        <p>
          If the link does not work, copy and paste { url } into your browser's address bar.
        </p>

        <hr />

        <p>
          If you feel you have received this message in error, you
          may <a href="%unsubscribe_url%">unsubscribe</a> from any future communication.
        </p>
      </div>
    )
  }
}

export function testEmail() {
  return renderToString(<_TestEmail />);
}

export function confirmationEmail(user) {
  return renderToString(<_ConfirmationEmail user={ user } />);
}

class _RecoveryEmail extends React.Component {
  render() {
    const user = this.props.user;

    const url = process.env.BASE_URL + `/auth/recover/${user.recovery_token}`

    return (
      <div>
        <p>
          Dear { user.first_name },
        </p>

        <p>
          You recently requested a password reset from OpenCircuit.us
        </p>

        <p>
          <a href={ url }>
            Click here to set a new password.
          </a>
        </p>

        <p>
          If the link does not work, copy and paste { url } into your browser's address bar.
        </p>

        <hr />

        <p>
          If you did not request a password reset, you may ignore this email. If
          you feel you have received this message in error, you
          may <a href="%unsubscribe_url%">unsubscribe</a> from any future communication.
        </p>
      </div>
    )
  }
}

export function recoveryEmail(user) {
  return renderToString(<_RecoveryEmail user={ user } />);
}
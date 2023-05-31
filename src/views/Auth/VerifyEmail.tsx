import * as React from "react";
import { Result, Button, Spin } from "antd";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks";

export const EmailVerifiedSuccess: React.FC = () => {
  return (
    <Result
      status="success"
      title="Success 😄"
      subTitle="Email has been verified, you can login now!"
      extra={[
        <Button type="primary" href="/login">
          Login
        </Button>,
      ]}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export const EmailVerificationFail: React.FC = () => {
  return (
    <Result
      status="error"
      title="Failed 😔"
      subTitle="An invalid or expired token provided!"
      extra={[
        <Button type="primary" href="/">
          Back Home
        </Button>,
      ]}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [verified, setVerified] = React.useState<Boolean | null>(
    token ? false : null
  );
  const [verifyEmailState] = useApi({
    endPoint: `/auth/verify-email/${token}`,
    onError: () => {
      setVerified(false);
    },
    onSuccess: () => {
      setVerified(true);
    },
    triggerOnMount: true,
    showErrorNotification: false,
  });

  if (verifyEmailState.loading) {
    return (
      <Spin
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size="large"
      />
    );
  }

  if (verified === null) return null;

  return (
    <div>
      <Helmet>
        <title>Verify Email</title>
      </Helmet>
      {verified ? <EmailVerifiedSuccess /> : <EmailVerificationFail />}
    </div>
  );
};

import { Helmet } from "react-helmet";
import { Button, Result } from "antd";

export const InternalServerError = () => (
  <div>
    <Helmet>
      <title>500</title>
    </Helmet>
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

export const AuthorizationError = () => (
  <div>
    <Helmet>
      <title>403</title>
    </Helmet>
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

export const NotFoundError = () => (
  <div>
    <Helmet>
      <title>404</title>
    </Helmet>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);

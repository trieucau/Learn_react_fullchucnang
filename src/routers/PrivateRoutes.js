import { useContext } from "react";
import { UserContext } from "../managecontext/UserContext";
import { Alert } from "react-bootstrap";

export default function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Người dùng không có quyền truy cập!</p>
        </Alert>
        ;
      </>
    );
  }
  return <>{props.children}</>;
}

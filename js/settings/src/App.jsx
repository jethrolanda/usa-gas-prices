import { lazy, Suspense } from "react";
import { Layout, Row, Col } from "antd";
import Documentation from "./components/Documentation";
const { Content } = Layout;
const Colors = lazy(() => import("./components/Colors"));
const DeleteCache = lazy(() => import("./components/DeleteCache"));
const App = () => {
  return (
    <Row>
      <Col sm={24} md={8}>
        <Layout
          style={{
            padding: "10px 20px 30px",
            margin: "10px"
          }}
        >
          <Content>
            <Suspense fallback={<h4>Please wait...</h4>}>
              <Colors />
              <DeleteCache />
            </Suspense>
          </Content>
        </Layout>
      </Col>
      <Col sm={24} md={16}>
        <Layout
          style={{
            padding: "10px 20px 30px",
            margin: "10px"
          }}
        >
          <Content style={{ display: "flex", flexDirection: "column" }}>
            <Documentation />
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default App;

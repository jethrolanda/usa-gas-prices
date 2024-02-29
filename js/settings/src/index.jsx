import App from "./App";
import { render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "../styles/main.scss";

render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#A2CD3A"
        },
        components: {
          Form: {},
          Button: {},
          Layout: {}
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("gas-prices-settings")
);

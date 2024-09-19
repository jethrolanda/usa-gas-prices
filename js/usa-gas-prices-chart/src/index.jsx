import App from "./App";
import { render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "../styles/main.scss";

document.querySelectorAll(".usa-gas-prices-chart").forEach((domContainer) => {
  render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A2CD3A",
            fontSize: 16
          },
          components: {
            Form: {},
            Button: {},
            Radio: {
              colorText: "var(--paragraph-color)",
              fontFamily: "Roboto",
              fontSize: "22px"
            }
          }
        }}
      >
        <App
          attributes={JSON.parse(
            domContainer.attributes["data-gas-prices-attr"].value
          )}
        />
      </ConfigProvider>
    </Provider>,
    domContainer
  );
});

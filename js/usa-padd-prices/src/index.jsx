import App from "./App";
import { render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "../styles/main.scss";

let usa_padd_price = document.getElementById("usa-padd-prices");

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
          usa_padd_price.attributes["data-padd-prices-attr"].value
        )}
      />
    </ConfigProvider>
  </Provider>,
  usa_padd_price
);

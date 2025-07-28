import App from "./App";
import { createRoot, render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "../styles/main.scss";

window.addEventListener("load", (event) => {
  let usa_padd_price = document.getElementById("usa-padd-prices");

  if (usa_padd_price) {
    if (createRoot) {
      createRoot(usa_padd_price).render(
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
                  fontFamily: "Lato, sans-serif",
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
        </Provider>
      );
    } else {
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
                  fontFamily: "Lato, sans-serif",
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
    }
  }
});

import App from "./App";
import { createRoot, render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "../styles/main.scss";

window.addEventListener("load", (event) => {
  document.querySelectorAll(".usa-gas-prices-chart").forEach((domContainer) => {
    if (domContainer) {
      if (createRoot) {
        createRoot(domContainer).render(
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
                domContainer={domContainer}
                attributes={JSON.parse(
                  domContainer.attributes["data-gas-prices-attr"].value
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
                domContainer={domContainer}
                attributes={JSON.parse(
                  domContainer.attributes["data-gas-prices-attr"].value
                )}
              />
            </ConfigProvider>
          </Provider>,
          domContainer
        );
      }
    }
  });
});

import App from "./App";
import { render } from "@wordpress/element";
import { Provider } from "react-redux";
import store from "./store";
import "../styles/main.scss";

document.querySelectorAll(".usa-gas-prices-chart").forEach((domContainer) => {
  render(
    <Provider store={store}>
      <App
        attributes={JSON.parse(
          domContainer.attributes["data-gas-prices-attr"].value
        )}
      />
    </Provider>,
    domContainer
  );
});

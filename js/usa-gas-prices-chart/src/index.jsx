import App from "./App";
import { render } from '@wordpress/element';
import { Provider } from "react-redux";
import store from "./store";

/**
 * Import the stylesheet for the plugin.
 */
import '../style/main.scss';
 
// Render the App component into the DOM
// render(  
//   <Provider store={store}>
//         <App />
//     </Provider>, 
//   document.querySelectorAll('.usa-gas-prices-chart')
// );
  
document.querySelectorAll('.usa-gas-prices-chart')
  .forEach((domContainer) => {
    render(
      <Provider store={store}>
        <App attributes={JSON.parse(domContainer.attributes['data-gas-prices-attr'].value)} />
      </Provider>,
      domContainer
    );
  });

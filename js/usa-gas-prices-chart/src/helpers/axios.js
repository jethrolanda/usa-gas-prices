import axios from "axios";

export default axios.create({
  baseURL: ugp_gas_prices_chart.rest_url,
  timeout: 30000,
  headers: { "X-WP-Nonce": ugp_gas_prices_chart.nonce }
});

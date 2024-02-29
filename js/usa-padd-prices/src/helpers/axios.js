import axios from "axios";

export default axios.create({
  baseURL: ugp_padd_prices.rest_url,
  timeout: 30000,
  headers: { "X-WP-Nonce": ugp_padd_prices.nonce }
});

import axios from 'axios';

export default axios.create({
  baseURL: ugp_settings.rest_url,
  timeout: 30000,
  headers: { "X-WP-Nonce" : ugp_settings.nonce }
});
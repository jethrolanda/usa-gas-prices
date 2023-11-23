<?php

/**
 * Scripts class
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

class UGP_Scripts
{

    /**
     * The single instance of the class.
     *
     * @since 1.0
     */
    protected static $_instance = null;

    /**
     * Main Instance.
     *
     * @since 1.0
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    /**
     * Only load scripts on page that is being used
     *
     * @since 1.0
     */
    public function load_front_end_styles_and_scripts() {

        global $post;

        $usa_gas_prices_chart_exist = false;
        $usa_gas_prices_table_exist = false;
        $display_current_average_price_exist = false;

        if($post && $post->ID){
            $shortcodes = get_post_meta( $post->ID, "ct_builder_shortcodes", true );
            if(strpos($shortcodes, 'usa_gas_prices_chart') !== false) {
                $usa_gas_prices_chart_exist = true;
            }
            if(strpos($shortcodes, 'usa_gas_prices_table') !== false) {
                $usa_gas_prices_table_exist = true;
            }
            if(strpos($shortcodes, 'display_current_average_price') !== false) {
                $display_current_average_price_exist = true;
            }
        }

        if($usa_gas_prices_chart_exist||$usa_gas_prices_table_exist||$display_current_average_price_exist){
            wp_enqueue_style('ugp-style', UGP_CSS_ROOT_URL . 'style.min.css');
        }
        
        if($usa_gas_prices_chart_exist || ($post && has_shortcode($post->post_content, 'usa_gas_prices_chart'))) {

            $this->plugin_scripts();
            
        }

    }

    /**
     * Load scripts
     *
     * @since 1.0
     */
    public function plugin_scripts() {
  
        wp_enqueue_style('usa-gas-prices-chart-style', UGP_JS_ROOT_URL . 'usa-gas-prices-chart/build/index.css');
        wp_enqueue_script('usa-gas-prices-chart-script', UGP_JS_ROOT_URL . 'usa-gas-prices-chart/build/index.js', array('wp-element', 'wp-i18n'), '1.0.0', true);
        wp_localize_script('usa-gas-prices-chart-script', 'ugp_settings', array(
            'rest_url'   => esc_url_raw( get_rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' ),
            'ajax_url' => admin_url('admin-ajax.php'),
            'settings_nonce' => wp_create_nonce( 'settings_nonce' ),
        ));
        
    }

    /**
     * Load scripts
     *
     * @since 1.0
     */
    public function load_oxygen_scripts() {

        global $post;
      
        if($post && $post->ID){
          $shortcodes = get_post_meta( $post->ID, "ct_builder_shortcodes", true );
          if(strpos($shortcodes, 'usa_gas_prices_chart') !== false) {
            $this->plugin_scripts();
          }
        }
      
    }

    /**
     * Execute model.
     *
     * @since 1.6.6
     * @access public
     */
    public function run() {
        
        // Load Backend CSS and JS
        add_action('admin_enqueue_scripts', array($this, 'load_front_end_styles_and_scripts'));

        // Load Frontend CSS and JS
        add_action('wp_enqueue_scripts', array($this, 'load_front_end_styles_and_scripts')); 

        // For compatibility with oxygen plugin
        // add_action('oxygen_enqueue_frontend_scripts', array($this, 'load_oxygen_scripts'));
        add_action('wp_print_footer_scripts', array($this, 'load_oxygen_scripts'), 99999);

    }

}
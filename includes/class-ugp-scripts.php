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

        $chart_shortcode_exist = false;
        $gas_prices_shortcode_exist = false;

        if($post && $post->ID){
            $shortcodes = get_post_meta( $post->ID, "ct_builder_shortcodes", true );
            if(strpos($shortcodes, '[usa_gas_prices_chart]') !== false) {
                $chart_shortcode_exist = true;
            }
            if(strpos($shortcodes, '[usa_gasoline_prices_table]') !== false ||strpos($shortcodes, '[usa_diesel_prices_table]') !== false) {
                $gas_prices_shortcode_exist = true;
            }
        }

        if($gas_prices_shortcode_exist){
            wp_enqueue_style('ugp-style', UGP_CSS_ROOT_URL . 'style.min.css');
        }
        
        if($chart_shortcode_exist || ($post && has_shortcode($post->post_content, 'usa_gas_prices_chart'))) {

            wp_enqueue_style('usa-gas-prices-chart-style', UGP_JS_ROOT_URL . 'usa-gas-prices-chart/build/index.css');
            wp_enqueue_script('usa-gas-prices-chart-script', UGP_JS_ROOT_URL . 'usa-gas-prices-chart/build/index.js', array('wp-element', 'wp-i18n'), '1.0.0', true);
            wp_localize_script('usa-gas-prices-chart-script', 'ugp_settings', array(
                'rest_url'   => esc_url_raw( get_rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'ajax_url' => admin_url('admin-ajax.php'),
                'settings_nonce' => wp_create_nonce( 'settings_nonce' ),
            ));
            
        }

    }

    /**
     * Load scripts
     *
     * @since 1.0
     */
    public function plugin_scripts() {
  
        // Range Slider
        wp_enqueue_style('range-slider-style-custom', UGP_CSS_ROOT_URL . 'style.min.css');
        wp_enqueue_style('range-slider-style', UGP_CSS_ROOT_URL . 'rangeslider.min.css');
      
        wp_enqueue_script('range-slider-script', UGP_JS_ROOT_URL . 'rangeslider.min.js', array('jquery'), '1.0.0', false);
        wp_enqueue_script('range-slider-setup-script', UGP_JS_ROOT_URL . 'slider-options.js', array('jquery'), '1.0.0', false);
      
        // jQuery modal
        wp_enqueue_script('pdf-report-script', UGP_JS_ROOT_URL . 'pdf-report.js', array('jquery'), '1.0.0', false);
        wp_localize_script('pdf-report-script',
                    'options',
                    array(
                        'ajax' => admin_url('admin-ajax.php')
                    )
                );

        wp_enqueue_script('pdf-report-modal-script', UGP_JS_ROOT_URL . 'jquery-modal/jquery.modal.min.js', array('jquery'), '1.0.0', false);
        wp_enqueue_style('pdf-report-modal-style', UGP_JS_ROOT_URL . 'jquery-modal/jquery.modal.min.css');
      
        // Toastr
        wp_enqueue_script('pdf-report-toastr-script', UGP_JS_ROOT_URL . 'toastr/toastr.min.js', array('jquery'), '1.0.0', false);
        wp_enqueue_style('pdf-report-toastr-style', UGP_JS_ROOT_URL . 'toastr/toastr.min.css');

        // Google Recaptcha
        wp_enqueue_script('pdf-report-google-recaptcha-script', 'https://www.google.com/recaptcha/api.js', array('jquery'), '1.0.0', false);
        
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

    }

}
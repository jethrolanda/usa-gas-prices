<?php
/**
 * Plugins custom settings page that adheres to wp standard
 * see: https://developer.wordpress.org/plugins/settings/custom-settings-page/
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class UGP_Shortcodes
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
     * USA Gas prices table
     *
     * @since 1.0
     * @access public
     */
    public function us_gas_prices_shortcode() { 

        ob_start();
        require_once(UGP_TEMPLATES_ROOT_DIR . 'gas-prices-table.php');
        //assign the file output to $content variable and clean buffer
        $content = ob_get_clean();
        return $content;

    }

    /**
     * Execute Model.
     *
     * @since 1.0
     * @access public
     */
    public function run() { 

        // USA Gas prices table shortcode
        add_shortcode('usa_gas_prices', array($this, 'us_gas_prices_shortcode'));

    }
    
}
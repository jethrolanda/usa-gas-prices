<?php
if (!defined('ABSPATH')) {
    exit;
}
// Exit if accessed directly

require_once UGP_INCLUDES_ROOT_DIR . 'class-ugp-scripts.php';
require_once UGP_INCLUDES_ROOT_DIR . 'class-ugp-shortcodes.php';
require_once UGP_INCLUDES_ROOT_DIR . 'class-ugp-settings.php';


class USA_Gas_Prices {

    /*
    |------------------------------------------------------------------------------------------------------------------
    | Class Members
    |------------------------------------------------------------------------------------------------------------------
     */
    private static $_instance;

    public $_ugp_scripts;
    public $_ugp_shortcodes;
    public $_ugp_settings;

    const VERSION = '1.0';

    /*
    |------------------------------------------------------------------------------------------------------------------
    | Mesc Functions
    |------------------------------------------------------------------------------------------------------------------
     */

    /**
     * Class constructor.
     *
     * @since 1.0.0
     */
    public function __construct() {

      $this->_ugp_scripts = UGP_Scripts::instance();
      $this->_ugp_shortcodes = UGP_Shortcodes::instance();
      $this->_ugp_settings = UGP_Settings::instance();

    }

    /**
     * Singleton Pattern.
     *
     * @since 1.0.0
     *
     * @return USA_Gas_Prices
     */
    public static function instance() {

      if (!self::$_instance instanceof self) {
          self::$_instance = new self;
      }

      return self::$_instance;
    }

    /**
     * Trigger on activation
     *
     * @since 1.0.0
     */
    public function activate() { }

    /**
     * Trigger on deactivation
     *
     * @since 1.0.0
     */
    public function deactivate() { }

    /**
     * Triggers the execution codes of the plugin models.
     *
     * @since 1.0
     * @access public
     */
    public function run() {
      
      // Register Activation Hook
      register_activation_hook(UGP_PLUGIN_DIR . 'usa-gas-prices.php', array($this, 'activate'));

      // Register Deactivation Hook
      register_deactivation_hook(UGP_PLUGIN_DIR . 'usa-gas-prices.php', array($this, 'deactivate'));

      // Run all the class hooks
      $this->_ugp_scripts->run();
      $this->_ugp_shortcodes->run();
      $this->_ugp_settings->run();

    }

}

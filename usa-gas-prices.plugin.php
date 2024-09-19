<?php
if (!defined('ABSPATH')) {
  exit;
}
// Exit if accessed directly

require_once 'autoloader.php';

class USA_Gas_Prices
{

  /*
    |------------------------------------------------------------------------------------------------------------------
    | Class Members
    |------------------------------------------------------------------------------------------------------------------
     */
  private static $_instance;

  public $scripts;
  public $shortcodes;
  public $settings;
  public $cron;
  public $blocks;

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
  public function __construct()
  {

    $this->scripts = \UGP\Plugin\Scripts::instance();
    $this->shortcodes = \UGP\Plugin\Shortcodes::instance();
    $this->settings = \UGP\Plugin\Settings::instance();
    $this->cron = \UGP\Plugin\Cron::instance();
    $this->blocks = \UGP\Plugin\Blocks::instance();

    // Register Activation Hook
    register_activation_hook(UGP_PLUGIN_DIR . 'usa-gas-prices.php', array($this, 'activate'));

    // Register Deactivation Hook
    register_deactivation_hook(UGP_PLUGIN_DIR . 'usa-gas-prices.php', array($this, 'deactivate'));
  }

  /**
   * Singleton Pattern.
   *
   * @since 1.0.0
   *
   * @return USA_Gas_Prices
   */
  public static function instance()
  {

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
  public function activate()
  {

    // Save PADD colors default values
    if (empty(get_option('ugp_padd_colors'))) {
      update_option('ugp_padd_colors', array(
        'padd_1a' => "#328e42",
        'padd_1b' => "#45b255",
        'padd_1c' => "#7ccb29",
        'padd_2' => "#5ca5bf",
        'padd_3' => "#162f3f",
        'padd_4' => "#8bc4d2",
        'padd_5' => "#265997"
      ));
    }

    // On activation, add event in cron to delete all cached json files. Trigger twice a day.
    if (!wp_next_scheduled('ugp_delete_json_cache')) {
      wp_schedule_event(time(), 'twicedaily', 'ugp_delete_json_cache');
    }
  }

  /**
   * Trigger on deactivation
   *
   * @since 1.0.0
   */
  public function deactivate()
  {

    wp_clear_scheduled_hook('ugp_delete_json_cache');
  }
}

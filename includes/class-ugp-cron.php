<?php

namespace UGP\Plugin;

/**
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * Cron Class
 */
class Cron
{

  /**
   * The single instance of the class.
   *
   * @since 1.0
   */
  protected static $_instance = null;


  /**
   * Class constructor.
   *
   * @since 1.0.0
   */
  public function __construct()
  {
    add_action('ugp_delete_json_cache', array($this, 'ugp_delete_json_cache_execute'));
  }

  /**
   * Main Instance.
   * 
   * @since 1.0
   */
  public static function instance()
  {

    if (is_null(self::$_instance)) {
      self::$_instance = new self();
    }
    return self::$_instance;
  }

  /**
   * Delete cache twice a day.
   *
   * @since 1.0
   * @access public
   */
  public function ugp_delete_json_cache_execute()
  {

    try {

      $upload_dir = wp_upload_dir();
      $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/*'; // get all file names

      $files = glob($base_dir);

      foreach ($files as $file) { // iterate files
        if (is_file($file)) {
          unlink($file); // delete file
        }
      }
    } catch (\Exception $e) {
      new \WP_Error('json_cache', $e->getMessage());
    }
  }
}

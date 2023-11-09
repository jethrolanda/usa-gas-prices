<?php
/**
 * Plugin Name: USA Gas Prices
 * Description: USA Gas prices history and graphs.
 * Version: 1.0
 * Author: Jethro Landa
 * Author URI: https://jethrolanda.com/
 * Text Domain: usa-gas-prices
 * Domain Path: /languages/
 * Requires at least: 5.7
 * Requires PHP: 7.2
 */

defined('ABSPATH') || exit; 

// Path Constants ======================================================================================================

define( 'UGP_MAIN_PLUGIN_FILE_PATH',  WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . 'usa-gas-prices' . DIRECTORY_SEPARATOR . 'usa-gas-prices.bootstrap.php' );
define( 'UGP_PLUGIN_BASE_NAME', 	    plugin_basename( UGP_MAIN_PLUGIN_FILE_PATH ) );
define( 'UGP_PLUGIN_BASE_PATH',	      basename( dirname( __FILE__ ) ) . '/' );
define( 'UGP_PLUGIN_URL',             plugins_url() . '/usa-gas-prices/' );
define( 'UGP_PLUGIN_DIR',             plugin_dir_path( __FILE__ ) );
define( 'UGP_CSS_ROOT_URL',           UGP_PLUGIN_URL . 'css/' );
define( 'UGP_CSS_ROOT_DIR',           UGP_PLUGIN_DIR . 'css/' );
define( 'UGP_IMAGES_ROOT_URL',        UGP_PLUGIN_URL . 'images/' );
define( 'UGP_IMAGES_ROOT_DIR',        UGP_PLUGIN_DIR . 'images/' );
define( 'UGP_INCLUDES_ROOT_URL',      UGP_PLUGIN_URL . 'includes/' );
define( 'UGP_INCLUDES_ROOT_DIR',      UGP_PLUGIN_DIR . 'includes/' );
define( 'UGP_JS_ROOT_URL',            UGP_PLUGIN_URL . 'js/' );
define( 'UGP_JS_ROOT_DIR',            UGP_PLUGIN_DIR . 'js/' );
define( 'UGP_TEMPLATES_ROOT_URL',     UGP_PLUGIN_URL . 'templates/' );
define( 'UGP_TEMPLATES_ROOT_DIR',     UGP_PLUGIN_DIR . 'templates/' );
define( 'UGP_VIEWS_ROOT_URL',         UGP_PLUGIN_URL . 'views/' );
define( 'UGP_VIEWS_ROOT_DIR',         UGP_PLUGIN_DIR . 'views/' );
define( 'UGP_LANGUAGES_ROOT_URL',     UGP_PLUGIN_URL . 'languages/' );
define( 'UGP_LANGUAGES_ROOT_DIR',     UGP_PLUGIN_DIR . 'languages/' );


// Run
require_once 'usa-gas-prices.plugin.php';
$ugp = USA_Gas_Prices::instance();
$GLOBALS['ugp'] = $ugp;

$ugp->run();
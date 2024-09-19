<?php
spl_autoload_register(function ($class) {
  $namespace = 'UGP\Plugin\\';

  if (strpos($class, $namespace) !== 0) {
    return;
  }

  $class = str_replace($namespace, '', $class);
  $class = str_replace('\\', DIRECTORY_SEPARATOR, strtolower($class)) . '.php';

  $directory = plugin_dir_path(__FILE__);
  $path = $directory . 'includes/class-ugp-' . $class;

  if (file_exists($path)) {
    require_once($path);
  }
});

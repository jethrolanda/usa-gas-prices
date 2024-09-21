<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

wp_enqueue_style('ugp-style');
wp_enqueue_style('usa-padd-prices-style');
wp_enqueue_script('usa-padd-prices-script');
?>


	<?php echo do_shortcode('[usa_padd_prices]') ?> 
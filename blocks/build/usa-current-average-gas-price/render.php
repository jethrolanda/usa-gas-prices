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

$type = isset($attributes['radioField']) ? $attributes['radioField'] : 'gasoline';
?>
	<?php echo do_shortcode('[usa_current_average_gas_price type="' . $type . '"]') ?> 


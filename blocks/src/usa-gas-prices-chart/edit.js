/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <div
        className="usa-gas-prices-chart"
        data-gas-prices-attr='{"type":"gasoline","gasoline":{"title":"Regular Gasoline Prices"},"diesel":{"title":"On-Highway Diesel Fuel Prices"},"subtitle":"(dollars per gallon)","location":{"U.S.":"U.S.","East Coast":"PADD 1","New England":"PADD 1A","Central Atlantic":"PADD 1B","Lower Atlantic":"PADD 1C","Midwest":"PADD 2","Gulf Coast":"PADD 3","Rocky Mountain":"PADD 4","West Coast":"PADD 5","California":"CALIFORNIA"}}'
      />
    </div>
  );
}

import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
  PanelBody,
  PanelRow,
  ColorPicker
} from "@wordpress/components";
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar
} from "@wordpress/block-editor";
// import { ChromePicker } from "react-color";

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
export default function Edit(props) {
  const blockProps = useBlockProps();

  function setType(value) {
    props.setAttributes({ type: value });
  }

  return (
    <div {...blockProps}>
      <div class="todays-gas-price-average">
        <BlockControls>
          <AlignmentToolbar
            value={props.attributes.theAlignment}
            onChange={(x) => props.setAttributes({ theAlignment: x })}
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody title="Background Color" initialOpen={true}>
            <PanelRow>
              asd
              {/* <ChromePicker
                color={props.attributes.bgColor}
                onChangeComplete={(x) =>
                  props.setAttributes({ bgColor: x.hex })
                }
                disableAlpha={true}
              /> */}
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div>
          <b>TODAYS GAS PRICE</b>
          <p>NATIONAL AVERAGE GASOLINE PRICE</p>
          <p>AS OF 09/16/24</p>
        </div>
        <div>$3.18</div>
      </div>
    </div>
  );
}

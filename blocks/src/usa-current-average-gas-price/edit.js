import { useEffect, useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Button,
  Icon,
  PanelBody,
  PanelRow,
  ColorPicker,
  CheckboxControl,
  RadioControl,
  ToggleControl,
  SelectControl
} from "@wordpress/components";

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
import {
  InspectorControls,
  BlockControls,
  AlignmentToolbar,
  RichText,
  useBlockProps
} from "@wordpress/block-editor";

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

  const [data, setData] = useState([]);
  const { attributes, setAttributes } = props;
  const {
    content,
    checkboxField,
    radioField,
    textField,
    toggleField,
    selectField
  } = attributes;

  function setType(value) {
    props.setAttributes({ type: value });
  }

  function onChangeContent(newContent) {
    setAttributes({ content: newContent });
  }

  function onChangeCheckboxField(newValue) {
    setAttributes({ checkboxField: newValue });
  }

  function onChangeRadioField(newValue) {
    setAttributes({ radioField: newValue });
  }

  function onChangeTextField(newValue) {
    setAttributes({ textField: newValue });
  }

  function onChangeToggleField(newValue) {
    setAttributes({ toggleField: newValue });
  }

  function onChangeSelectField(newValue) {
    setAttributes({ selectField: newValue });
  }

  useEffect(() => {
    // Submit ajax request
    try {
      const formData = new FormData();
      formData.append("action", "ugp_get_usa_current_average_gas_price");
      formData.append("type", radioField);
      formData.append("nonce", "nonce");
      const data = fetch(ugp_gas_prices_chart.ajax_url, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then(({ status, data }) => {
          if (status === "success") {
            setData(data);
          }
        });
      // console.log("Server data!", data);
    } catch (e) {
      // Something went wrong!
    }
  }, [radioField]);

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
          <PanelBody title="Settings" initialOpen={true}>
            {/* <PanelRow> */}
            {/* <ChromePicker
                color={props.attributes.bgColor}
                onChangeComplete={(x) =>
                  props.setAttributes({ bgColor: x.hex })
                }
                disableAlpha={true}
              /> */}
            <RadioControl
              label="Type"
              selected={radioField}
              options={[
                { label: "Gasoline", value: "gasoline" },
                { label: "Diesel", value: "diesel" }
              ]}
              onChange={onChangeRadioField}
            />
            <CheckboxControl
              __nextHasNoMarginBottom
              heading="Checkbox Field"
              label="Tick Me"
              help="Additional help text"
              checked={checkboxField}
              onChange={onChangeCheckboxField}
            />

            <TextControl
              __nextHasNoMarginBottom
              label="Text Field"
              help="Additional help text"
              value={textField}
              onChange={onChangeTextField}
            />
            <ToggleControl
              __nextHasNoMarginBottom
              label="Toggle Field"
              checked={toggleField}
              onChange={onChangeToggleField}
            />
            <SelectControl
              __nextHasNoMarginBottom
              label="Select Control"
              value={selectField}
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
                { value: "c", label: "Option C" }
              ]}
              onChange={onChangeSelectField}
            />
            {/* </PanelRow> */}
          </PanelBody>
        </InspectorControls>
        <div>
          {radioField === "gasoline" ? (
            <>
              <b>TODAYS GAS PRICE</b>
              <p>NATIONAL AVERAGE GASOLINE PRICE</p>
            </>
          ) : (
            <>
              <b>TODAYS DIESEL PRICE</b>
              <p>NATIONAL AVERAGE ROAD DIESEL PRICE</p>
            </>
          )}

          <p>AS OF {data.date}</p>
        </div>
        <div>{data.price}</div>
      </div>
    </div>
  );
}

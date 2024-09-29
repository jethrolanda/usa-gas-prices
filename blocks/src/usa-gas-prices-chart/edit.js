import { useEffect, useState } from "@wordpress/element";
import { PanelBody, RadioControl } from "@wordpress/components";

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
  useBlockProps,
  RichText
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
export default function Edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();

  const [element, setElement] = useState("");
  const { title, subtitle, typeField } = attributes;

  function onChangeRadioField(newValue) {
    setAttributes({ typeField: newValue });
  }

  function onChangeTitle(title) {
    setAttributes({ title });
  }

  function onChangeSubTitle(subtitle) {
    setAttributes({ subtitle });
  }

  useEffect(() => {
    setAttributes({
      title:
        typeField === "gasoline"
          ? "Regular Gasoline Prices"
          : "On-Highway Diesel Fuel Prices"
    });
  }, [typeField]);

  useEffect(() => {
    // Submit ajax request
    try {
      const formData = new FormData();
      formData.append("action", "ugp_get_usa_gas_prices_chart_shortcode");
      formData.append("type", typeField);
      formData.append("nonce", "nonce");
      const data = fetch(ugp_gas_prices_chart.ajax_url, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then(({ status, data }) => {
          if (status === "success") {
            setElement(data);
          }
          // console.log(data);
        });
      // console.log("Server data!", data);
    } catch (e) {
      // Something went wrong!
    }
  }, [typeField]);

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Settings" initialOpen={true}>
          <RadioControl
            label="Type"
            help="Note: Please reload the editor after updating to see the change take effect."
            selected={typeField}
            options={[
              { label: "Gasoline", value: "gasoline" },
              { label: "Diesel", value: "diesel" }
            ]}
            onChange={onChangeRadioField}
          />
        </PanelBody>
      </InspectorControls>
      <div className="usa-gas-prices-chart-wrapper">
        <RichText
          key="editable"
          tagName="h2"
          onChange={onChangeTitle}
          value={title}
        />
        <RichText
          key="editable"
          tagName="span"
          onChange={onChangeSubTitle}
          value={subtitle}
        />
        {typeField === "gasoline" ? (
          <div
            className="usa-gas-prices-chart"
            data-gas-prices-attr='{"type":"gasoline","gasoline":{"title":"Regular Gasoline Prices"},"diesel":{"title":"On-Highway Diesel Fuel Prices"},"subtitle":"(dollars per gallon)","location":{"U.S.":"U.S.","East Coast":"PADD 1","New England":"PADD 1A","Central Atlantic":"PADD 1B","Lower Atlantic":"PADD 1C","Midwest":"PADD 2","Gulf Coast":"PADD 3","Rocky Mountain":"PADD 4","West Coast":"PADD 5","California":"CALIFORNIA"}}'
          />
        ) : (
          <div
            className="usa-gas-prices-chart"
            data-gas-prices-attr='{"type":"diesel","gasoline":{"title":"Regular Gasoline Prices"},"diesel":{"title":"On-Highway Diesel Fuel Prices"},"subtitle":"(dollars per gallon)","location":{"U.S.":"U.S.","East Coast":"PADD 1","New England":"PADD 1A","Central Atlantic":"PADD 1B","Lower Atlantic":"PADD 1C","Midwest":"PADD 2","Gulf Coast":"PADD 3","Rocky Mountain":"PADD 4","West Coast":"PADD 5","California":"CALIFORNIA"}}'
          />
        )}
        {/* <div
        className="usa-gas-prices-chart"
        data-gas-prices-attr='{"type":"gasoline","gasoline":{"title":"Regular Gasoline Prices"},"diesel":{"title":"On-Highway Diesel Fuel Prices"},"subtitle":"(dollars per gallon)","location":{"U.S.":"U.S.","East Coast":"PADD 1","New England":"PADD 1A","Central Atlantic":"PADD 1B","Lower Atlantic":"PADD 1C","Midwest":"PADD 2","Gulf Coast":"PADD 3","Rocky Mountain":"PADD 4","West Coast":"PADD 5","California":"CALIFORNIA"}}'
      /> */}
        {/* {element && <div dangerouslySetInnerHTML={{ __html: element }} />} */}
      </div>
    </div>
  );
}

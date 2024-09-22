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
    <div class="usa-gas-prices-wrapper" {...blockProps}>
      <h2>U.S. Regular Gasoline Prices</h2>
      <span>(dollars per gallon)</span>
      <div id="usa-gasoline-prices">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>09/02/24</th>
              <th>09/09/24</th>
              <th>09/16/24</th> <th>week ago</th>
              <th>year ago</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>U.S.</td>
              <td>3.289</td>
              <td>3.236</td>
              <td>3.180</td> <td class="value_down">-0.056</td>
              <td class="value_down">-0.698</td>
            </tr>
            <tr>
              <td>East Coast (PADD1)</td>
              <td>3.233</td>
              <td>3.149</td>
              <td>3.085</td> <td class="value_down">-0.064</td>
              <td class="value_down">-0.569</td>
            </tr>
            <tr>
              <td class="level-1-indent">New England (PADD1A)</td>
              <td>3.288</td>
              <td>3.235</td>
              <td>3.146</td> <td class="value_down">-0.089</td>
              <td class="value_down">-0.636</td>
            </tr>
            <tr>
              <td class="level-1-indent">Central Atlantic (PADD1B)</td>
              <td>3.366</td>
              <td>3.293</td>
              <td>3.246</td> <td class="value_down">-0.047</td>
              <td class="value_down">-0.588</td>
            </tr>
            <tr>
              <td class="level-1-indent">Lower Atlantic (PADD1C)</td>
              <td>3.138</td>
              <td>3.040</td>
              <td>2.970</td> <td class="value_down">-0.070</td>
              <td class="value_down">-0.538</td>
            </tr>
            <tr>
              <td>Midwest (PADD2)</td>
              <td>3.171</td>
              <td>3.098</td>
              <td>3.005</td> <td class="value_down">-0.093</td>
              <td class="value_down">-0.705</td>
            </tr>
            <tr>
              <td>Gulf Coast (PADD3)</td>
              <td>2.844</td>
              <td>2.800</td>
              <td>2.728</td> <td class="value_down">-0.072</td>
              <td class="value_down">-0.703</td>
            </tr>
            <tr>
              <td>Rocky Mountain (PADD4)</td>
              <td>3.401</td>
              <td>3.357</td>
              <td>3.400</td> <td class="value_up">0.043</td>
              <td class="value_down">-0.671</td>
            </tr>
            <tr>
              <td>West Coast (PADD5)</td>
              <td>4.101</td>
              <td>4.104</td>
              <td>4.136</td> <td class="value_up">0.032</td>
              <td class="value_down">-1.027</td>
            </tr>
            <tr>
              <td class="level-1-indent">West Coast less California</td>
              <td>3.762</td>
              <td>3.727</td>
              <td>3.723</td> <td class="value_down">-0.004</td>
              <td class="value_down">-1.011</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

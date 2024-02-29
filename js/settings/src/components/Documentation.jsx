import { Divider, Space } from "antd";
import USAPaddPrices from "../images/usa-padd-prices.PNG";
import CurrentAverageGasPrices from "../images/current-average-gas-prices.PNG";
import DieselPricesChart from "../images/on-highway-diesel-prices-chart.PNG";
import GasolinePricesChart from "../images/regular-gasoline-prices-chart.PNG";
import DieselPricesTable from "../images/usa-on-highway-diesel-prices-table.PNG";
import GasolinePricesTable from "../images/usa-regular-gasoline-prices-table.PNG";

const Documentation = () => {
  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <b>DOCUMENTATION</b>
      </Divider>
      <Space direction="vertical">
        USA Gas Prices plugin contains the following shortcodes:
        <h3>[usa_current_average_gas_price]</h3>
        This shortcode displays the current average gas price for the current
        week. You can also supply a "type" as argument. If no argument is added,
        the default type is gasoline.
        <ul>
          <li>Example:</li>
          <li>
            <code>[display_current_average_price type='gasoline']</code> to
            display the gasoline average price of the week.
          </li>
          <li>
            <code>[display_current_average_price type='diesel']</code> to
            display the diesel average price of the week.
          </li>
        </ul>
        <h4>Screenshot:</h4>
        <Space direction="horizontal" align="start">
          <img src={CurrentAverageGasPrices} style={{ width: "100%" }} />
        </Space>
      </Space>

      <Divider />
      <Space direction="vertical">
        <h3>[usa_gas_prices_table]</h3>
        This shortcode displays gas prices from previous (3) weeks and from the
        previous year. You can also supply a "type" as argument. If no argument
        is added, the default type is gasoline.
        <ul>
          <li>Example:</li>
          <li>
            <code>[usa_gas_prices_table type='gasoline']</code> to display the
            gasoline price table.
          </li>
          <li>
            <code>[usa_gas_prices_table type='diesel']</code> to display the
            diesel price table.
          </li>
        </ul>
        <h4>Screenshot:</h4>
        <Space direction="horizontal" align="start">
          <img src={GasolinePricesTable} style={{ width: "100%" }} />
          <img src={DieselPricesTable} style={{ width: "100%" }} />
        </Space>
      </Space>

      <Divider />
      <Space direction="vertical">
        <h3>[usa_gas_prices_chart]</h3>
        This shortcode displays gas prices for the past 2 years in a line chart.
        You can filter the chart by region and filter the range. You can also
        supply a "type" as argument in the shortcode. If no argument is added,
        the default type is gasoline.
        <ul>
          <li>Example:</li>
          <li>
            <code>[usa_gas_prices_chart type='gasoline']</code> to display the
            gasoline price chart.
          </li>
          <li>
            <code>[usa_gas_prices_chart type='diesel']</code> to display the
            diesel price chart.
          </li>
        </ul>
        <h4>Screenshot:</h4>
        <Space direction="horizontal" align="start">
          <img src={GasolinePricesChart} style={{ width: "100%" }} />
          <img src={DieselPricesChart} style={{ width: "100%" }} />
        </Space>
      </Space>

      <Divider />
      <Space direction="vertical">
        <h3>[usa_padd_prices]</h3>
        This shortcode displays USA Map with gas price when you click a state.
        <h4>Screenshot:</h4>
        <Space direction="horizontal" align="start">
          <img src={USAPaddPrices} style={{ width: "100%" }} />
        </Space>
      </Space>
    </>
  );
};

export default Documentation;

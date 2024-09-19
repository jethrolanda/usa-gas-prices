import { Radio, Space } from "antd";
import USAMap from "./USAMap";

const GasTypeFilter = ({ type, setType }) => {
  const onChange = (e) => {
    setType(e.target.value);
  };
  return (
    <div className="gas-type-filter">
      <Space>
        <USAMap width={100} height={50} defaultFill="#c7c7c7" disabled />
        <Radio.Group onChange={onChange} value={type} size="large">
          <Space>
            <Radio value="diesel">Diesel</Radio>
            <Radio value="gas">Gas</Radio>
          </Space>
        </Radio.Group>
      </Space>
    </div>
  );
};

export default GasTypeFilter;

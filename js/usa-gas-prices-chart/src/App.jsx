import { useEffect, useMemo } from "react";
import { Chart } from "react-google-charts";
import Checkboxes from "./components/Checkboxes";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import {
  fetchGasolineYearData,
  fetchDieselYearData
} from "./store/reducer/chartSlice";
import { useSelector, useDispatch } from "react-redux";
import useGetMinMax from "./helpers/useGetMinMax";
import useColors from "./helpers/useColors";
import RadioButtons from "./components/RadioButtons";

const App = ({ attributes }) => {
  const dispatch = useDispatch();

  const data = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.chartData
      : state.chartState.diesel.chartData
  );

  // Min max chart data
  const minMax = useMemo(() => useGetMinMax(data), [data]);

  // Title
  const title =
    attributes?.type == "gasoline"
      ? attributes?.gasoline?.title
      : attributes?.diesel?.title;

  // Colors
  const order = useSelector((state) =>
    attributes?.type == "gasoline"
      ? state.chartState.gasoline.selected
      : state.chartState.diesel.selected
  );
  const defaultColors = useSelector((state) => state.chartState.colors);
  const lineColors = useMemo(
    () => useColors(order, defaultColors),
    [order, defaultColors]
  );

  useEffect(() => {
    if (attributes?.type == "gasoline") {
      dispatch(fetchGasolineYearData({ cb: ({ order, orig }) => {} }));
    } else {
      dispatch(fetchDieselYearData({ cb: ({ order }) => {} }));
    }
  }, []);

  return (
    <>
      {/* <h2>{title}</h2>
      <span>{attributes?.subtitle}</span> */}
      <Checkboxes location={attributes?.location} attributes={attributes} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <RadioButtons attributes={attributes} />
      </div>
      {data.length <= 0 ? (
        <div className="loader-custom-style">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24
                }}
                spin
              />
            }
          />{" "}
        </div>
      ) : (
        <Chart
          chartType="LineChart"
          data={data}
          options={{
            width: "100%",
            height: "500px",
            chartArea: {
              left: 40,
              width: "100%"
            },
            curveType: "function",
            legend: { position: "none" },
            tooltip: { isHtml: true },
            vAxis: {
              // logScale: true,
              // scaleType: 'log',
              gridlines: {
                // minSpacing: attributes?.type == 'gasoline' ? 5 : 17,
                // interval: .5
              },
              minorGridlines: {
                color: "transparent"
              },
              maxValue: minMax?.max,
              minValue: minMax?.min,
              viewWindow: {
                min: minMax?.min,
                max: minMax?.max
              },
              viewWindowMode: "pretty"
              // format: '0'
            },
            // pointSize: 1,
            series: lineColors,
            explorer: {
              // actions: ['dragToZoom', 'rightClickToReset'],
              axis: "vertical",
              keepInBounds: true,
              maxZoomIn: 4.0
            }
          }}
        />
      )}
    </>
  );
};
export default React.memo(App);

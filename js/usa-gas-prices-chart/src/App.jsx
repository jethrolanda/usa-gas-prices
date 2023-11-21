import { useEffect, useState } from 'react';
import { Chart, GoogleDataTableRow, GoogleDataTableColumn } from "react-google-charts";
import Checkboxes from './components/Checkboxes';
import {
  fetchGasolineYearData,
  fetchDieselYearData
} from './store/reducer/chartSlice';
import { useSelector, useDispatch } from 'react-redux';

const App = ({attributes}) => {
  
  const dispatch = useDispatch();

  const data = useSelector(state => attributes?.type == 'gasoline' ? state.chartState.gasoline.chartData : state.chartState.diesel.chartData )
  const title = attributes?.type == 'gasoline' ? attributes?.gasoline?.title : attributes?.diesel?.title;
 
  useEffect(()=> {
    if(attributes?.type == 'gasoline') {
      dispatch(fetchGasolineYearData({cb: ({order, orig}) => {
      }}));
    } else {
      dispatch(fetchDieselYearData({cb: ({order}) => {
      }}));
    }
  }, []);
  
  return <>
      <h6>{title}</h6>
      <span>{attributes?.subtitle}</span>
      <Checkboxes location={attributes?.location} attributes={attributes}/>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          curveType: "function",
          legend: { position: "none" },
          tooltip: { isHtml: true },
          vAxis: {
            logScale: true,
            scaleType: 'log',
            gridlines: { 
              minSpacing: attributes?.type == 'gasoline' ? 5 : 17
            },
            minorGridlines: {
              color: 'transparent', 
            }
          },
          pointSize: 1,
          series: {
            0: {  },
            // 1: { color: '#e7711b' },
            // 2: { color: '#f1ca3a' },
            // 3: { color: '#6f9654' },
            // 4: { color: '#1c91c0' },
            // 5: { color: '#43459d' },
          },
        }}
      />
    </>;
};
export default React.memo(App);
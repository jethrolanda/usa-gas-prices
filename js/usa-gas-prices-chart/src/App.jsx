import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import Checkboxes from './components/Checkboxes';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
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
      <p style={{fontWeight:'bold', margin: '0px'}}>{title}</p>
      <span>{attributes?.subtitle}</span>
      <Checkboxes location={attributes?.location} attributes={attributes}/>
      {data.length <= 0 ? <div className="loader-custom-style"><Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        } /> </div>:
        <Chart
          chartType="LineChart"
          data={data}
          options={{
            width: '100%',
            height: '400px',
            chartArea: { 
              left: 40,
              width: '100%'
            },
            curveType: "function",
            legend: { position: "none" },
            tooltip: { isHtml: true },
            vAxis: {
              logScale: true,
              scaleType: 'log',
              gridlines: { 
                // minSpacing: attributes?.type == 'gasoline' ? 5 : 17,
                // interval: 2
              },
              minorGridlines: {
                color: 'transparent', 
              },
              maxValue: 2,
              format: '0'
            },
            // pointSize: 1,
            series: {
              0: {  },
              // 1: { color: '#e7711b' },
              // 2: { color: '#f1ca3a' },
              // 3: { color: '#6f9654' },
              // 4: { color: '#1c91c0' },
              // 5: { color: '#43459d' },
            },
            animation:{
              startup: true,
              duration: 200,
              easing: 'in'
            },
          }}
        />
      }
    </>;
};
export default React.memo(App);
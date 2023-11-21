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
 
  const chartEvents = [{
    eventName: 'select',
    callback({ chartWrapper }) {
      console.log(chartWrapper,chartWrapper.getChart())
      chartWrapper.getChart().hideColumns([1, 2]);
      // hideColumns: [1, 2]
        // const selectedItems = chartWrapper.getChart().getSelection();
        // if (selectedItems.length > 0) {
        //     const selectedItem = selectedItems[0];
        //     const row = selectedItem.row + 1;
        //     const dataPoint = data[row];
        //     alert(`You clicked on category ${dataPoint[0]} with profit ${dataPoint[1]}`);
        // }
    }
}];

  const htmlTooltip = (key, data) => {
    
    let html = '<div style="padding: 10px; width: 180px;">' +
                `<h6>${key}</h6>` +
                `<p style="padding-bottom: 4px; margin: 0px;">${data?.period}</p>` +
                `<p style="padding-bottom: 4px; margin: 0px;">${data?.value} dollars per gallon</p>` +
                '</div>';
    console.log(html)
    return html;
  }

  useEffect(()=> {
    if(attributes?.type == 'gasoline') {
      dispatch(fetchGasolineYearData({cb: ({order, orig}) => {
        // let columns = ['Date'];
        // let rows = [];
        // let data = [];
        // Object.keys(order).map((loc, index)=> {
          
        //   columns = [...columns, loc, {type: 'string', role: 'tooltip', p:{html:true, role: 'tooltip'}}]
        // })

        // let total = orig['U.S.'].length;
        //   for(let i = 0; i < total; i++){
        //       let temp = [orig['U.S.'][i]?.period];
        //       Object.keys(order).map((loc)=>{
        //         let key = order[loc];
        //         temp = [...temp, orig[key][i]?.value];
        //         temp = [...temp, htmlTooltip(loc, orig[key][i])];
        //       });

        //       rows = [...rows, temp];
        //   }
        // data = [columns, ...rows];
      }}));
    } else {
      dispatch(fetchDieselYearData({cb: ({order}) => {
        // Object.keys(order).map((loc, index)=> {
        //   console.log(loc)
        // })
      }}));
    }
  }, []);
  
  return <>
      <h4>{title} <span>{attributes?.subtitle}</span></h4>
      <Checkboxes location={attributes?.location} attributes={attributes}/>
      <Chart
      // data={[
      //   ["Year", "ASD", "Expenses"],
      //   ["2004", 0, 2],
      //   ["2005", 0, 1],
      //   ["2006", 0, 3],
      //   ["2007", 0, 2],
      // ]}
      // chartEvents={chartEvents}
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={{
            curveType: "function",
            legend: { position: "none" },
            tooltip: { isHtml: true },
            vAxis: {
              // logScale: true,
              // scaleType: 'log',
              // gridlines: { 
              //   minSpacing: attributes?.type == 'gasoline' ? 5 : 17
              // },
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
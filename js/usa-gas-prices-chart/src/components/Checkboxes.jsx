import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import useLineGraphData from '../helpers/useLineGraphData'
import {
  setGasolineChartData,
  setDieselChartData
} from '../store/reducer/chartSlice';
import { useSelector, useDispatch } from 'react-redux';

const Checkboxes = ({location, attributes}) => {
  
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [checked, setChecked] = useState([]);

  const order = useSelector(state => attributes?.type == 'gasoline' ? state.chartState.gasoline.order : state.chartState.diesel.order );
  const orig = useSelector(state => attributes?.type == 'gasoline' ? state.chartState.gasoline.orig : state.chartState.diesel.orig );
  
  const onChange = (list) => {
    const updated = useLineGraphData({order, orig, list})

    if(attributes?.type == 'gasoline') {
      dispatch(setGasolineChartData(updated));
    } else {
      dispatch(setDieselChartData(updated));
    }
    
    setChecked(list);
  };

  useEffect(()=> {
    let choices = [];
    let selected = [];

    Object.keys(location).map((loc, index)=> {
      selected = [ ...selected, loc];
      choices = [...choices, {label: loc, value: loc}]
    })
    
    setOptions(choices);
    setChecked(selected);
  }, []);

  return <Checkbox.Group options={options} value={checked} onChange={onChange}/>;
};
export default Checkboxes;
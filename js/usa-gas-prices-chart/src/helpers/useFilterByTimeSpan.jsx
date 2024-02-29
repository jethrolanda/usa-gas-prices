export default function useFilterByTimeSpan(data, timestamp) {
  let updated = [];
  
  if(timestamp !== undefined){
     updated = data.filter((d, i) => {
      let date = new Date(d[0]);
      let seconds = date.getTime() / 1000;
      return i === 0 || seconds > timestamp;
    });
  }
  
  return updated.length > 0 ? updated : data;

}
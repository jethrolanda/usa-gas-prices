export default function useMinMax(data) {
  let min = 0;
  let max = 0;
  
  data.slice(1).map(item => {
    item.map((item2, i) => {
      if(i%2 === 1){
        if(min === 0){
          min = item2;
        }
        if(item2 < min){
          min = item2;
        }
        if(item2 > max){
          max = item2;
        }
      }
    })
  })

  return { min, max }
  // return { min: Math.trunc(min), max: Math.trunc(max) }

}
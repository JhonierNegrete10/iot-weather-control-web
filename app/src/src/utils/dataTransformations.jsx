
export function transformData(historicData) {
    let transformedData = {
      x: [],
      y: [],
      z :[], 
      color: [],
    };
  
    for (let i = 0; i < historicData.length; i++) {
      let dataPoint = historicData[i];
      let avgHumidity = (dataPoint.humidity_1 + dataPoint.humidity_2) / 2;
      let temperature = dataPoint.temperature
      let color = dataPoint.valve_satus === "ON" ? "rgb(0, 255, 0)" : "red";
      transformedData.x.push(dataPoint.created_at);
      transformedData.y.push(avgHumidity);
      transformedData.z.push(temperature);
      transformedData.color.push(color);
    }
  
    return transformedData;
  }
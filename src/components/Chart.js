import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState({ max: true, min: false });
  const [chartType, setChartType] = useState("scatter");
  const [error, setError] = useState("");
  
  const [maxChecked, setMaxChecked] = useState(true);
  const [minChecked, setMinChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const oxValue = e.target.ox.value;
    const type = e.target.chartType.value;

    
    if (!maxChecked && !minChecked) {
      setError("Пожалуйста, выберите хотя бы одну величину по оси OY.");
      return;
    }
    setError("");
    setOx(oxValue);
    setOy({ max: maxChecked, min: minChecked });
    setChartType(type);
  };

  const createArrGraph = (data, key) => {
    const group = d3.group(data, d => d[key]);
    const arr = [];
    for (let [label, items] of group) {
      const [min, max] = d3.extent(items.map(d => d['Высота']));
      arr.push({ labelX: label, min, max });
    }
    if (key === "Год") arr.sort((a, b) => a.labelX - b.labelX);
    return arr;
  };

  const graphData = createArrGraph(props.data, ox);

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit} className="chart-form">
        <p>Значение по оси OX:</p>
        <label>
          <input type="radio" name="ox" value="Страна" defaultChecked /> Страна
        </label>
        <br />
        <label>
          <input type="radio" name="ox" value="Год" /> Год
        </label>

        <p>Значение по оси OY:</p>
        
        <label className={!maxChecked && !minChecked ? "error" : ""}>
          <input
            type="checkbox"
            name="oy_max"
            checked={maxChecked}
            onChange={(e) => setMaxChecked(e.target.checked)}
          /> Максимальная высота
        </label>
        <br />
        <label className={!maxChecked && !minChecked ? "error" : ""}>
          <input
            type="checkbox"
            name="oy_min"
            checked={minChecked}
            onChange={(e) => setMinChecked(e.target.checked)}
          /> Минимальная высота
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType} className="type-button">
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit" className="draw-button">Построить</button>
        </p>
        
      </form>

      {!error && (
        <ChartDraw
          data={graphData}
          oy={oy}
          chartType={chartType}
        />
      )}
    </>
  );
};

export default Chart;
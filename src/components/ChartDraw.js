import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = ({ data, oy, chartType }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Привязываем атрибуты width/height к SVG по размеру контейнера
  useEffect(() => {
    const svg = d3.select(ref.current);
    const { width, height } = ref.current.getBoundingClientRect();
    svg.attr("width", width).attr("height", height);
    setSize({ width, height });
  }, []);

  const margin = { top: 10, right: 10, bottom: 60, left: 40 };
  const w = size.width - margin.left - margin.right;
  const h = size.height - margin.top - margin.bottom;

  // Собираем все выбранные Y-значения для масштабирования
  const allY = [
    ...(oy.max ? data.map(d => d.max) : []),
    ...(oy.min ? data.map(d => d.min) : [])
  ];
  const [yMin, yMax] = d3.extent(allY);

  const scaleX = useMemo(() =>
    d3.scaleBand()
      .domain(data.map(d => d.labelX))
      .range([0, w])
      .padding(chartType === "bar" ? 0.2 : 0.5),
    [data, w, chartType]
  );

  const scaleY = useMemo(() =>
    d3.scaleLinear()
      .domain([yMin * 0.9, yMax * 1.1])
      .range([h, 0]),
    [h, yMin, yMax]
  );

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // Оси
    svg.append("g")
      .attr("transform", `translate(${margin.left},${size.height - margin.bottom})`)
      .call(d3.axisBottom(scaleX))
      .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(scaleY));

    // Рисуем точки или бары
   if (chartType === "scatter") {
      const drawDot = (key, color) => {
        svg.selectAll(`.dot-${key}`)
          .data(data)
          .enter()
          .append("circle")
            .attr("class", `dot-${key}`)
            .attr("r", 5)
            .attr("cx", d => margin.left + scaleX(d.labelX) + scaleX.bandwidth()/2)
            .attr("cy", d => {
              if (key === "min" && oy.max && d.min === d.max) {
                return margin.top + scaleY(d[key]) + 2;
              }
              return margin.top + scaleY(d[key]);
            })
            .style("fill", color);
      };
      if (oy.max) drawDot("max", "red");
      if (oy.min) drawDot("min", "blue");
    }
    else if (chartType === "bar") {
      // Сколько серий (max/min) отрисовывать
      const series = [];
      if (oy.max) series.push({ key: "max", color: "red" });
      if (oy.min) series.push({ key: "min", color: "blue" });
      const bandWidth = scaleX.bandwidth() / series.length;

      series.forEach((s, i) => {
        svg.selectAll(`.bar-${s.key}`)
          .data(data)
          .enter()
          .append("rect")
            .attr("class", `bar-${s.key}`)
            .attr("x", d =>
              margin.left +
              scaleX(d.labelX) +
              i * bandWidth
            )
            .attr("y", d => margin.top + scaleY(d[s.key]))
            .attr("width", bandWidth)
            .attr("height", d => h - scaleY(d[s.key]))
            .style("fill", s.color);
      });
    }
  }, [data, scaleX, scaleY, oy, chartType, size.height]);

  return (
    <svg ref={ref}></svg>
  );
};

export default ChartDraw;

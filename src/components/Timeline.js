// src/components/Timeline.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Timeline = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 800)
      .attr('height', 400);

    const xScale = d3.scaleTime()
      .domain([new Date(1990, 0, 1), new Date()])
      .range([50, 750]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.discovery_count)])
      .range([350, 50]);

    svg.append('g')
      .attr('transform', 'translate(0, 350)')
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', 'translate(50, 0)')
      .call(d3.axisLeft(yScale));

    // Tooltip setup
    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background-color", "#fff")
      .style("padding", "5px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "5px")
      .style("display", "none");

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(new Date(d.discovery_year)))
      .attr("cy", d => yScale(d.discovery_count))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        tooltip.style("display", "inline-block")
          .html(`Year: ${d.discovery_year}<br/>Count: ${d.discovery_count}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default Timeline;

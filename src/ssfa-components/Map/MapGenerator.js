// import for d3 tools
import React, { useEffect } from 'react';
import { geoPath, geoConicEqualArea } from 'd3-geo';
import * as d3 from 'd3';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import { IconButton, Box } from '@mui/material';

import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

import data from 'data/geo.json';
import useWindowDimensions from 'ssfa-components/utils/useWindowDimensions';
import { getFromStorage } from 'ssfa-components/utils/utils';

function locationFormatter(input) {
  switch (input) {
    case 'Brunei Darussalam':
      return 'Brunei';
    case 'RO Korea':
      return 'South Korea';
    default:
      return input.trim() ?? 'NA';
  }
}

function researchTypeCounter(original_val, researchType) {
  original_val[researchType] = original_val[researchType]
    ? original_val[researchType] + 1
    : 1;
  return original_val;
}

function socioTypeCounter(original_val, socioType) {
  original_val.legal =
    socioType.legal === 'Yes' ? original_val.legal + 1 : original_val.legal;
  original_val.cultural =
    socioType.cultural === 'Yes'
      ? original_val.cultural + 1
      : original_val.cultural;
  original_val.economic =
    socioType.economic === 'Yes'
      ? original_val.economic + 1
      : original_val.economic;
  original_val.policy =
    socioType.policy === 'Yes' ? original_val.policy + 1 : original_val.policy;
  return original_val;
}

function workLocationCounter(original_val, workLocation) {
  original_val.laboratory = workLocation.includes('Laboratory')
    ? original_val.laboratory + 1
    : original_val.laboratory;
  original_val.desktop = workLocation.includes('Desktop')
    ? original_val.desktop + 1
    : original_val.desktop;
  return original_val;
}

function plasticSizeCounter(original_val, plasticSize) {
  original_val.macroplastic = plasticSize.includes('Macroplastic')
    ? original_val.macroplastic + 1
    : original_val.macroplastic;
  original_val.microplastic = plasticSize.includes('Microplastic')
    ? original_val.microplastic + 1
    : original_val.microplastic;
  return original_val;
}

function getInfo() {
  const data = getFromStorage('data');
  const position = getFromStorage('position');
  const rows = data?.data?.table.rows;

  let officialName = {};
  let pubNum = {};
  let researchTypeCount = {};
  let socioTypeCount = {};
  let workLocationCount = {};
  let fieldSamplingCount = {};
  let plasticSizeCount = {};
  let fishingGearCount = {};

  rows.forEach((row) => {
    const name_list = row.c[position['Location/Territory studied']]?.v
      .trim()
      .split(new RegExp('[,;]', 'g'));
    const researchType = row.c[position['Sci/Humanities']]?.v.trim();
    const socioType = {
      legal: row.c[position['Legal/Regulatory Study']]?.v.trim(),
      cultural: row.c[position['Social/Cultural Study']]?.v.trim(),
      economic: row.c[position['Economic/Management Study']]?.v.trim(),
      policy: row.c[position['Policy Study']]?.v.trim(),
    };
    const workLocation = row.c[position['Location of Work']]?.v.trim();
    const fieldSampling = row.c[position['Field Sampling_Conducted']]?.v.trim();
    const plasticSize = row.c[position['Plastic Sizes Examined']]?.v.trim();
    const fishingGear = row.c[position['Fishing Gear Examined']]?.v.trim();

    name_list?.forEach((country) => {
      const name = locationFormatter(country.trim());
      officialName[name] = country.trim();
      pubNum[name] = pubNum[name] ? pubNum[name] + 1 : 1;
      researchTypeCount[name] = researchTypeCounter(
        researchTypeCount[name] ?? { Science: 0, Humanities: 0, Both: 0 },
        researchType
      );
      socioTypeCount[name] = socioTypeCounter(
        socioTypeCount[name] ?? {
          legal: 0,
          cultural: 0,
          economic: 0,
          policy: 0,
        },
        socioType
      );
      workLocationCount[name] = workLocationCounter(
        workLocationCount[name] ?? { laboratory: 0, desktop: 0 },
        workLocation
      );
      fieldSamplingCount[name] = fieldSamplingCount[name]
        ? fieldSampling === 'Yes'
          ? fieldSamplingCount[name] + 1
          : fieldSamplingCount[name]
        : fieldSampling === 'Yes'
        ? (fieldSamplingCount[name] = 1)
        : (fieldSamplingCount[name] = 0);
      plasticSizeCount[name] = plasticSizeCounter(
        plasticSizeCount[name] ?? { macroplastic: 0, microplastic: 0 },
        plasticSize
      );
      fishingGearCount[name] = fishingGearCount[name]
        ? fishingGear === 'Yes'
          ? fishingGearCount[name] + 1
          : fishingGearCount[name]
        : fishingGear === 'Yes'
        ? (fishingGearCount[name] = 1)
        : (fishingGearCount[name] = 0);
    });
  });

  return {
    officialName,
    pubNum,
    researchTypeCount,
    socioTypeCount,
    workLocationCount,
    fieldSamplingCount,
    plasticSizeCount,
    fishingGearCount,
  };
}

const Tooltip = (dataTip, mapInfo) => {
  return (
    <div>
      {mapInfo ? (
        <>
          <p style={{ fontSize: '18px' }}>{mapInfo.officialName[dataTip]}</p>
          <br />
          <p>Total number of publications ({mapInfo.pubNum[dataTip]})</p>
          <ul style={{ marginLeft: 40 }}>
            <li>
              Science only ({mapInfo.researchTypeCount[dataTip]?.Science})
            </li>
            <li>
              Humanities only ({mapInfo.researchTypeCount[dataTip]?.Humanities})
            </li>
            <li>Both ({mapInfo.researchTypeCount[dataTip]?.Both})</li>
            <li>
              Laboratory-based ({mapInfo.workLocationCount[dataTip]?.laboratory}
              )
            </li>
            <li>
              Destop-based ({mapInfo.workLocationCount[dataTip]?.desktop})
            </li>
            <li>Field sampling ({mapInfo.fieldSamplingCount[dataTip]})</li>
            <li>
              Microplastic ({mapInfo.plasticSizeCount[dataTip]?.microplastic})
            </li>
            <li>
              Macroplastic ({mapInfo.plasticSizeCount[dataTip]?.macroplastic})
            </li>
            <li>Fishing gear ({mapInfo.fishingGearCount[dataTip]})</li>
            <li>Legal/Regulatory ({mapInfo.socioTypeCount[dataTip]?.legal})</li>
            <li>
              Social/Cultural ({mapInfo.socioTypeCount[dataTip]?.cultural})
            </li>
            <li>
              Economic/Management ({mapInfo.socioTypeCount[dataTip]?.economic})
            </li>
            <li>Policy Study ({mapInfo.socioTypeCount[dataTip]?.policy})</li>
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default function MapGenerator() {
  const { isDataChanged } = useSelector((state) => state.rootData);
  const [mapInfo, setMapInfo] = React.useState(null);
  const containerRef = React.useRef(null);
  const [windowHeight] = useWindowDimensions();
  const height = windowHeight * 0.6;

  useEffect(() => {
    const info = getInfo();
    setMapInfo(info);
    // console.log(info)
  }, [isDataChanged]);

  //Map generation
  useEffect(() => {
    let width = containerRef.current?.offsetWidth;
    d3.select('#map').selectChildren().remove();

    // Projection generation
    const projection = geoConicEqualArea()
      .rotate([0, 50])
      .fitExtent(
        [
          [10, 10],
          [width, height],
        ],
        data
      );
    const path = geoPath().projection(projection);

    // Zoom behaviour
    const zoomBehavior = d3
      .zoom()
      .scaleExtent([1, 20])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (event) => {
        d3.select('g').attr('transform', event.transform);
      });

    const clicked = (event, d) => {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      g.transition().style('fill', null);
      d3.select(this).transition().style('fill', null);
      svg
        .transition()
        .duration(750)
        .call(
          zoomBehavior.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(
              Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
            )
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
          d3.pointer(event, svg.node())
        );
    };

    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(zoomBehavior);

    const g = svg.append('g').attr('fill', '#c8a464');

    g.selectAll('path')
      .data(data.features, (feature) => {
        return feature;
      })
      .enter()
      .append('path')
      .attr('id', (feature) => feature.properties.sovereignt)
      .attr('data-for', 'Tooltip')
      .attr('data-tip', (feature) => feature.properties.sovereignt)
      .attr('data-event', 'click focus')
      .attr('style', 'outline: none !important;')
      .attr('d', path)
      .attr('stroke', 'white')
      .attr('stroke-width', 0.1)
      .on('click', clicked);

    function reset() {
      svg
        .transition()
        .duration(750)
        .call(
          zoomBehavior.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    d3.select('#re-center').on('click', reset);

    ReactTooltip.rebuild();
  }, [height, containerRef.current?.offsetWidth]);

  return (
    <>
      <div
        id="MapContainer"
        ref={containerRef}
        style={{
          border: '1px solid #475657',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div id="map"></div>
        <ReactTooltip
          id="Tooltip"
          border={false}
          offset={{ top: 20 }}
          delayUpdate={200}
          place={'top'}
          globalEventOff="click"
          getContent={(dataTip) => Tooltip(dataTip, mapInfo)}
        />
        <Box style={{ textAlign: 'center' }}>
          <IconButton
            size="small"
            color="inherit"
            id="re-center"
            style={{ margin: '0 auto', display: 'flex' }}
          >
            <ZoomOutMapIcon />
          </IconButton>
        </Box>
      </div>
    </>
  );
}

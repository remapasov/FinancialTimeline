import React, { useEffect, useState, useMemo } from 'react';
// import { Timeline, DataSet } from 'vis-timeline/standalone'
// import { DataSet } from "vis-data/peer"
// import { Timeline } from "vis-timeline/peer";
// import "../../vis-timeline/styles/vis-timeline-graph2d.css";
import "../../node_modules/vis-timeline/dist/vis-timeline-graph2d.css";
import Timeline from 'react-visjs-timeline'
// import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx';

// import { traitImg, toolboxImg, cashImg } from './constants';

export const TimeLineComponent = (props) => {
  const defaultItems = [
    {
        id: 0,
        content: "666",
        start: "2024-04-20",
        end: "2025-04-20"
    },
    {
        id: 1,
        content: "666",
        start: "2024-04-20",
        end: "2025-10-20"
    },
    {
        id: 2,
        content: "666.3",
        start: "2025-04-20",
        end: "2026-04-20"
    }
  ]

  // const [data, setData] = useState(null);
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   setTimelineItems(items);
  // }, [items]);

  const options = {
    width: '100vw',
    // zoomFriction: 10000,
    // timeAxis: {scale: 'year', step: 10},
    // height: '560px',
    // stack: false,
    // showMajorLabels: true,
    // showCurrentTime: true,
    // zoomMin: 1000000,
    // type: 'background',
    // format: {
    //   minorLabels: {
    //     minute: 'h:mma',
    //     hour: 'ha'
    //   }
    // }
  }

  // const items = [
  //   {id: 1, group: 1, content: '15%', start: '2024-04-20', end: '2025-04-20'},
  //   {id: 2, group: 1, content: '15,5%', start: '2024-04-20', end: '2025-10-20'},
  //   {id: 3, group: 2, content: '16%', start: '2025-04-20', end: '2026-04-20'},
  //   {id: 4, group: 2, content: '14%', start: '2025-08-20', end: '2026-08-20'},
  // ]


  const groups = useMemo(() => {
    if (!items.length) return []
    const names = items.map((el) => el.group)
    return [...new Set(names)].map((el, index) => {
      return {
        id: el,
        content: el
      }
    })
  }, [items])

  const handleCancel = () => {
    // setData([])
    setItems([])
  }

  const handleDownload = () => {
    const fileItems = items.map((el) => {
      const { id, ...obj } = el
      return obj
    })
    const worksheet = XLSX.utils.json_to_sheet(fileItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });
    XLSX.writeFile(workbook, "Test_dates.xlsx");
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // const sheetData = XLSX.utils.sheet_to_json(sheet);
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
      const items = sheetData.map((el, index) => {
        return {
          id: index,
          group: el[0],
          // group: 1,
          content: String(el[1]),
          start: el[2],
          end: el[3],
        }
      })

      setItems(items)
      // setData(sheetData);
    };

    // reader.readAsBinaryString(file);
    reader.readAsArrayBuffer(file)
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button name="button" onClick={handleCancel}>Сброс</button>
      <button name="button" onClick={handleDownload}>Скачать</button>
      <Timeline items={items} options={options} groups={groups} />
      {/*{data && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{data}</pre>
        </div>
      )}*/}
    </div>
  )
}
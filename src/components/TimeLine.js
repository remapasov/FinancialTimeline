import React, { useEffect, useState, useMemo } from 'react';
// import { Timeline, DataSet } from 'vis-timeline/standalone'
// import { DataSet } from "vis-data/peer"
// import { Timeline } from "vis-timeline/peer";
// import "../../vis-timeline/styles/vis-timeline-graph2d.css";
import "../../node_modules/vis-timeline/dist/vis-timeline-graph2d.css";
import Timeline from 'react-visjs-timeline'
// import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Button, Upload, Icon } from 'antd'
import { AddEditForm } from './AddEditForm.js'
import { UploadOutlined, RollbackOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

export const TimeLineComponent = (props) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [title, setTitle] = useState(null);

  const options = {
    order: (first, second) => moment(second.end).diff(moment(first.end)),
    orientation: 'both'
    // width: '80vw',
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
    // reader.abort()
    setItem(null)
    setItems([])
  }

  const handleDownload = () => {
    // const fileItems = items.map((el) => {
    //   const { id, content, ...obj } = el
    //   return obj
    // })
    const fileItems = items.map((el) => {
      const { id, content, title, ...obj } = el
      return {
        ...obj,
        start: moment(el.start, 'YYYY-MM-DD').format('DD.MM.YYYY'),
        end: moment(el.end, 'YYYY-MM-DD').format('DD.MM.YYYY'),
        refillDate: el.refillDate ? moment(el.refillDate, 'YYYY-MM-DD').format('DD.MM.YYYY') : undefined,
      }
    })
    const worksheet = XLSX.utils.json_to_sheet(fileItems);
    const colWidth = []
    worksheet['!cols'] = Object.keys(fileItems[0]).map((el) => {
      return { wch: 25 }
    })
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.utils.sheet_add_aoa(worksheet, [title], { origin: "A1" });
    XLSX.writeFile(workbook, "Test_dates.xlsx");
  }

  const reader = useMemo(() => new FileReader())

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // const sheetData = XLSX.utils.sheet_to_json(sheet);
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
      const title = sheetData[0]
      sheetData.splice(0, 1)
      const items = sheetData.map((el, index) => {
        return {
          id: index,
          group: el[0],
          rate: el[1],
          start: moment(el[2], 'DD.MM.YYYY').format('YYYY-MM-DD'),
          end: moment(el[3], 'DD.MM.YYYY').format('YYYY-MM-DD'),
          value: el[4],
          refillDate: el[5] ? moment(el[5], 'DD.MM.YYYY').format('YYYY-MM-DD') : '',
          content: el[5] ? `${el[4]} (${String(el[1])}%), пополнение до ${el[5]}` : `${el[4]} (${String(el[1])}%)`,
          title: `${ el[0]}, возврат вклада: ${el[3]}`
        }
      })
      .filter((el) => !!el.rate)
      /** Не отображать просроченные вклады **/
      /** TODO Добавить возможность отображения **/
      .filter((el) => !moment().isAfter(el.end))

      setTitle(title)
      setItems(items)
    };

    // reader.readAsBinaryString(file);
    reader.readAsArrayBuffer(file)
    e.target.value = ""
  }

  const clickHandler = (props) => {
    console.log(props)
    setItem(items[props.item])
  }

  return (
    <div className='wrapper'>
      <div className='timeline'>
        <div className='buttons-menu'>
          <Upload
              beforeUpload={(file) => handleFileUpload(file)}
              listType="text"
              showUploadList={false}
          >
            <Button className='button-menu' color='primary' variant='outlined' icon={<UploadOutlined />}>Загрузить файл</Button>
          </Upload>
          <Button onClick={handleCancel} className='button-menu' icon={<RollbackOutlined />} danger>Сброс</Button>
          <Button onClick={handleDownload} className='button-menu' color='cyan' variant='outlined' icon={<VerticalAlignBottomOutlined />}>Скачать</Button>

          {/*<button name="button" onClick={handleCancel}>Сброс</button>*/}
          {/*<button name="button" onClick={handleDownload}>Скачать</button>*/}
        </div>
        {items.length
          ? <Timeline
              items={items}
              options={options}
              clickHandler={clickHandler}
              groups={groups}
            />
          : null
        }
      </div>
      <AddEditForm item={item} setItem={setItem} setItems={setItems}/>
    </div>
  )
}
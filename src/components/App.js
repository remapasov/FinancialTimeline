import React, { useEffect, useState } from 'react';
import { Select, Switch } from 'antd';
import { TimeLineComponent } from './TimeLine.js';

import '../styles/App.scss';
// import { constants, dictionary, initialFilterState } from './constants';

// import toolBox from '../images/toolbox_img_cr.png';
// import trait from '../images/trait_cr.png';
// import cash from '../images/cash_cr.png';

const App = () => {
  // const initialLang = localStorage.getItem('huntMapLang');
  // if (!initialLang) {
  //   localStorage.setItem('huntMapLang', 'en');
  // }

  // const [lang, setLang] = useState(initialLang || 'en');
  // const [mapImage, setMapImage] = useState(dictionary[lang].maps.stillwater);
  // const [mapType, setMapType] = useState(constants.stillwater);
  // const [filters, setFilters] = useState(initialFilterState);

  // const buttonMapClick = (mapImage, mapType) => {
  //   setMapImage(mapImage);
  //   setMapType(mapType);
  // };

  // const filterItemClick = (filter) => {
  //   setFilters({
  //     ...filters,
  //     [filter]: !filters[filter],
  //   });
  // };

  // useEffect(() => {
  //   setMapImage(dictionary[lang].maps[mapType]);
  // }, [lang]);

  // const onLangSelect = (value) => {
  //   localStorage.setItem('huntMapLang', value);
  //   setLang(value);
  // }

  return (
    <>
      {/*<header>
        <div className='header'>
          <h1>Financial Timeline</h1>
        </div>
      </header>*/}
      <main>
        <div className='map-field'>
          {/*<Map mapImage={mapImage} mapType={mapType} filters={filters}/>*/}
          <div id='timeLineContainer'></div>
          <TimeLineComponent />
        </div>
      </main>
    </>
  );
}

export default App;

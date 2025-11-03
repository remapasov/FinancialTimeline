import React, { useEffect, useState } from 'react';
import { Select, Switch } from 'antd';
import { TimeLineComponent } from './TimeLine.js';
import '../styles/App.scss';

const App = () => {
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

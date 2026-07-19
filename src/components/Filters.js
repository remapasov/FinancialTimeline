import React, { useState } from 'react';
import { Button, Checkbox } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { OutsideClickListener } from '../tools/OutsideClickListener.js'

export const Filters = (props) => {
  const { setFilters } = props
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const hideFilters = () => {
    setCollapsed(false);
  };

  const onRefillChange = (e) => {
    setFilters((prevFilters) => {
      setChecked(e.target.checked)
      const filters = Object.assign({}, prevFilters)
      filters.onlyRefill = !checked
      return filters
    })
  }

  return (
    <div className='filters'>
      <OutsideClickListener clickHandle={hideFilters}>
        <Button type='primary' onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        { collapsed &&
          <div className='filterList'>
            <Checkbox onChange={onRefillChange} checked={checked} >
              Отображать только с возможностью пополнения
            </Checkbox>
          </div>
        }
      </OutsideClickListener>
    </div>
  );
}
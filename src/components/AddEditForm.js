import React, { useEffect, useState, useMemo } from 'react';
import { Button, Input, InputNumber, Form, DatePicker } from 'antd'
import {v4 as uuidv4} from 'uuid';
import { findIndex, some } from 'lodash'
import * as moment from 'moment';

export const AddEditForm = (props) => {
  const { item, setItem, items, setItems } = props
  const [form] = Form.useForm();
  const dateFormat = 'DD.MM.YYYY';

  const onFinish = (value) => {
    const newItem = {
      ...value,
      start: value.start.format('YYYY-MM-DD'),
      end: value.end.format('YYYY-MM-DD'),
      refillDate: value.refillDate ? value.refillDate.format('YYYY-MM-DD') : undefined,
      id: item ? item.id : uuidv4(),
      rate: String(value.rate),
      // value: String(value.value),
      // content: value.refillDate ? `${value.rate}%, пополнение до ${value.refillDate}` : `${value.rate}%`,
      content: value.refillDate ? `${value.value} (${value.rate}%), пополнение до ${value.refillDate.format('DD.MM.YYYY')}` : `${value.value} (${value.rate}%)`,
      title: `${value.value}, возврат вклада: ${value.end.format('DD.MM.YYYY')}`
    }
    /* if item.id === */
    setItems((prevItems) => {
      console.log(prevItems)
      const items = [ ...prevItems ]
      if (some(items, { id: newItem.id })) {
        const index = findIndex(items, { id: newItem.id })
        items[index] = newItem
      } else {
        items.push(newItem)
      }
      return items
    })
    form.resetFields()
    setItem(null)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  form.setFieldsValue({
    group: item ? item.group : '',
    rate: item ? item.rate : '',
    start: item ? moment(item.start) : '',
    end: item ? moment(item.end) : '',
    value: item ? item.value : '',
    refillDate: item && item.refillDate ? moment(item.refillDate) : '',
  });

  return (
    <Form
      form={form}
      name='AddEdit'
      className='add-edit-form'
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      // style={{ maxWidth: '20vw' }}
      /** initialValues={{ remember: true }} */
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"

      layout="horizontal"
      labelCol={{ flex: '150px' }}
      labelAlign="left"
      // labelWrap
      // wrapperCol={{ flex: 1 }}
    >
      <Form.Item
        label="Банк"
        name="group"
        rules={[{ required: true, message: 'Обязательно для заполнения!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Ставка"
        name="rate"
        rules={[{ required: true, message: 'Обязательно для заполнения!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Дата открытия"
        name="start"
        rules={[{ required: true, message: 'Обязательно для заполнения!' }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        label="Дата возврата"
        name="end"
        rules={[{ required: true, message: 'Обязательно для заполнения!' }]}
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        label="Сумма"
        name="value"
        rules={[{ required: true, message: 'Обязательно для заполнения!' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Пополнение до"
        name="refillDate"
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Button type="primary" htmlType="submit" className='form-button'>
        Добавить
      </Button>
      <Button
        className='form-button'
        onClick={() => {
          form.resetFields();
          setItems(defaultItems)
          setItem(null)
        }}
      >
        Сброс
      </Button>
    </Form>
  )
}
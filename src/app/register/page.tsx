"use client";
import { validation } from '@/helpers/validation';
import { Button, Form, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'

const Registerpage = () => {

  const onFinish = async(values:any) =>{
      try{
        const response = await axios.post("/api/users/register",values);
        message.success(response.data.message)
      }catch(error:any){
        message.error(error.response.data.message || error.message)
      }
      
  }
  return (
    <>
    <div className='container-auth'>
      <Form onFinish={onFinish}>
      <h1 className='center'>Register</h1>

        <FormItem label="Name" name="name" rules={validation}>
            <input className='border-4' type="text" />
        </FormItem>
        <FormItem label="Email" name="email" rules={validation}>
            <input className='border-4' type="email" />
        </FormItem>
        <FormItem label="Password" name="password" rules={validation}>
            <input className='border-4' type="password" />
        </FormItem>
        <Button className='buttonn' type='primary' htmlType='submit'>Register</Button>
        <Link href='/login'>Already have an account</Link>
      </Form>
    </div>
    </>
  )
}

export default Registerpage
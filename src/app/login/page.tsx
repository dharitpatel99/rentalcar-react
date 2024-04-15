"use client"
import { validation } from '@/helpers/validation';
import { Button, Form, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const Loginpage = () => {
  const router = useRouter();
  const onFinish = async(values:any) =>{
    try{
      const response = await axios.post("/api/users/login",values);
      message.success(response.data.message)
      router.push('/');
    }catch(error:any){
      message.error(error.response.data.message || error.message)
    }
    
}
return (
  <>
  <div className='container-auth'>
<h1 className='center'>Login</h1>
    <Form className='' onFinish={onFinish}>
      <FormItem label="Email" name="email" rules={validation}>
          <input className='' type="email" />
      </FormItem>
      <FormItem label="Password" name="password" rules={validation}>
          <input className='' type="password" />
      </FormItem>
      <Button className='buttonn' type='primary' htmlType='submit'>Login</Button>
      <Link href='/register'>Create an account</Link>
    </Form>
  </div>
  </>
)
}

export default Loginpage
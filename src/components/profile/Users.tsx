import { Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {

  const [user,setUser] = useState([]);
  const getdata = async()=>{

    try{
      const response = await axios.get(`/api/users`);
    setUser(response.data.data)
    }catch(error:any){
      message.error(error.message)
    }
    
  }

  useEffect(()=>{
    getdata()
  },[])

  const columns = [
    {
      title:"Name",
      dataIndex:"name"
    },
    {
      title:"email",
      dataIndex:"email"
    }
  ]
  return (
    <Table dataSource={user} columns={columns} />
  )
}

export default Users
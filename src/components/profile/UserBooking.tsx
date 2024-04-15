import { Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const UserBooking = () => {

  const [booking,setBooking]=useState([]);
  const {currentUser} = useSelector((state:any)=>state.users)
 
  const getData = async()=>{
    try{
      let url = `/api/bookings`;
      if(!currentUser.isAdmin){
        url = `/api/bookings?user=${currentUser._id}`;
      }
    const response = await axios.get(url);
    setBooking(response.data.data)

    }catch(error:any){
      message.error(error.response.data.message || error.message)
    }

  }

  useEffect(()=>{
    getData()
  },[])

  const columns = [
    {
      title:"Booking id",
      dataIndex:"_id"
    },
    {
      title:"Car",
      dataIndex:"car",
      render:(car:any)=>car.name
    },
    {
      title:"Total Hours",
      dataIndex:"totalHour"
    },
    {
      title:"Status",
      dataIndex:"status"
    },{
      title:"from Slot",
      dataIndex:"fromSlot"
    },
    {
      title:"to Slot",
      dataIndex:"toSlot"
    }
  ]


  
  return (
    <Table dataSource={booking} columns={columns} />
  )
}

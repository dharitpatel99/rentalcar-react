import { Button, Table, message } from 'antd'
import React, { useState } from 'react'
import CarForm from './CarForm'
import axios from 'axios';

const Cars = () => {

  const [cars,setCars] = useState([]);
  const [showCarModal,setShowCarModal] = useState(false);
  const [selectedCar,setSelectedCar] = React.useState(null);

  const getData = async () =>{
    try{
      const response = await axios.get("/api/cars");
      setCars(response.data.data);
    }catch(error:any){
      message.error(error.message)
    }
  }

  const deleteCar = async(id:any)=>{
 try{
  const response = await axios.delete(`/api/cars/${id}`);
  message.success(response.data.message)
  getData()
 }catch(error:any){
  message.error(error.message)
 }

  }

  React.useEffect(()=>{
    getData();
  },[])

  const columns:any = [
    {
      title:"car Image",
      dataIndex:"carImage",
      render:(carimage:any)=>{
        <img src={carimage} alt='car' width="50" height="50"/>
      }
    },
    {
      title:"car name",
      dataIndex:"name",
    },
    {
      title:"Brand",
      dataIndex:"brand",
    },
    {
      title:"Fuel Type",
      dataIndex:"fuelType",
    },
    {
      title:"rent per Hour",
      dataIndex:"rentPerHour",
    },
    {
      title:"Action",
      dataIndex:"action",
      render:(_:any,record:any)=>(
     <>
        <Button onClick={()=>{setSelectedCar(record);setShowCarModal(true);}}>edit</Button>
        <Button onClick={()=>{
          deleteCar(record._id)
        }}>delete</Button></>
      )
    }
  ]

  return (
      <>
          <div className='text-3xl'>
      <Button className='primary'
      onClick={()=>{
        setSelectedCar(null)
        setShowCarModal(true)}}
      >Add Car</Button>
    </div>
    <Table dataSource={cars} columns={columns} rowKey="_id" />
    {showCarModal && <CarForm setShowCarModal={setShowCarModal} showCarModal={showCarModal} selectedCar={selectedCar} reloadData={getData}/>}
      </>
  )
}

export default Cars
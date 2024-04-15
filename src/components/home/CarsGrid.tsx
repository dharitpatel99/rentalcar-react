"use client"
import React from 'react'
import { Button, Col, Row } from 'antd';
import { useRouter } from 'next/navigation';


const CarsGrid = (cars:any) => {
    console.log("hiii");
    const allcar = cars.cars;
    const router = useRouter();
    console.log(allcar);
    
  return (
    <Row className='cargrid' gutter={[16,16]}>
    {allcar.map((car:any)=>{
      return (<Col span={6}>
        <div className="cargrid-card">
           
          <img src={car.carImage} alt="hehe" height="200" width="200"/>
          <p className='carname'>{car.name}</p>
            <p className='carfuel'>Type: {car.fuelType}</p>
            <p className='carrent'>${car.rentPerHour} per/hour</p>
          <Button className='primary' type='primary' onClick={()=>{router.push(`/cars/${car._id}`)}}>Book</Button>
        </div>
      </Col>)
    })}
  </Row>
  )
}

export default CarsGrid
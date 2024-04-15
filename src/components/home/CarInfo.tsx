"use client"
import { Button, DatePicker, message } from 'antd'
import axios from 'axios';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const path = require('path');

const CarInfo = ({car}:any) => {

const router = useRouter();
const pathname = usePathname();
const {RangePicker} = DatePicker;

const [fromSlot,setFromSlot] = useState(null);
const [toSlot,setToSlot] = useState(null);
const {currentUser} = useSelector((state:any)=>state.users)

    const filename = path.basename(car.carImage);
    const image = `http://localhost:3000/images/${filename}`

    useEffect(()=>{

    },[pathname])
    

const bookNow = async() =>{
    console.log("currentUser");
    const payload = {
        car:car._id,
        user:currentUser._id,
        fromSlot,
        toSlot,
        totalHour:moment(toSlot).diff(moment(fromSlot),'hours'),
        totalAmount:moment(toSlot).diff(moment(fromSlot),'hours')*car.rentPerHour
    };
    
    

    try{
        await axios.post('/api/bookings',payload);
        message.success("Car booked Successfully")
        router.push('/profile');
    }catch(error:any){
        message.error(error.message)
    }
}




  return (
    <div className='container'>
        <div className='carinfo-img'>
        <img src={image} alt="hi"  />

        </div>
        <h1>Car Name : {car.name}</h1>
        <h2>Car Brand : {car.brand}</h2>
        <h2>Car type : {car.fuelType}</h2>
        <h2>Rent per hour: ${car.rentPerHour}</h2>
        <div>
            <RangePicker className='picker'
            showTime={{format:"HH:mm"}}
            format="YYYY-MM-DD HH:mm"
            onChange={(value:any)=>{
                setFromSlot(value[0].toDate());
                setToSlot(value[1].toDate());
            }}
            disabledDate={(current:any)=>{
                return current && current < moment().endOf("day");
            }}
            />
        </div>
       {toSlot && fromSlot && (<div>
            <p className='slot'>Total Hours:{moment(toSlot).diff(moment(fromSlot),'hours')}</p>
            <p className='slot'>
            Total Amount:${moment(toSlot).diff(moment(fromSlot),'hours')*car.rentPerHour}</p>
        </div>)}

<Button onClick={()=>{router.back()}}>Back</Button>
<Button type='primary' onClick={()=>{bookNow()}} disabled={!fromSlot || !toSlot}>Book now</Button>
    </div>
  )
}

export default CarInfo

function Path() {
    throw new Error('Function not implemented.');
}

import CarInfo from '@/components/home/CarInfo';
import { Button } from 'antd';
import axios from 'axios';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React from 'react'

export async function getCar(carid:any) {
  
  try{
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get(`http://localhost:3000/api/cars/${carid}`,{
      headers:{Cookie:`token=${token}`}
    })
  console.log(response.data.data);
    
    return response.data.data;
  }catch(error){
    throw error;
  }
}

const CarPage = async({params}:any) => {
const car = await getCar(params?.carid);
const car2=car;
console.log("hiio");

console.log(car2);

  return car && (
    <>
    <CarInfo car={car}/>
    </>
  )
}

export default CarPage
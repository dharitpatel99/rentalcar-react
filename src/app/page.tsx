
import axios from 'axios';
import { cookies } from 'next/headers';
import CarsGrid from '@/components/home/CarsGrid';

export async function getCars() {
  try{
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get("http://localhost:3000/api/cars",{
      headers:{Cookie:`token=${token}`}
    })
    
    return response.data.data;
  }catch(error){
    throw error;
  }
}

export default async function Home() {
  const cars = await getCars();
  
  return (
    <>
    <h1>All Car</h1>
   <div>
      <CarsGrid  cars={cars}/>
   </div>

    </>
  );
}

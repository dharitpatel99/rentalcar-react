"use client";
import { Button, ConfigProvider, message } from 'antd'
import { useRouter,usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { cookies } from "next/headers";
import axios from "axios";
import { request } from 'http';
import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentUser } from '@/redux/userSlice';


const LayoutProvider = ({children}:any) => {

    const {currentUser} = useSelector((state:any) => state.users)
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    // const [user,setUser] = useState<any>('');
    const getCurrentUser = async() => {

        try{
        //   const cookieStore = cookies();
        //   const token = cookieStore.get("token")?.value;
          const response = await axios.get("/api/users/currentuser");
          dispatch(SetCurrentUser(response.data.data))
        //   setUser(response.data.data)
        //     headers:{
        //       Cookie:`token=${token}`
        //     },
        //   })
        return response.data.data;
      
        }catch(error:any){
            message.error(error.response.data.message || error.message)
        }
      }

      const onLogout = async()=>{
        try{
              await axios.get("/api/users/logout");
                message.success("User logged out successfully")
                router.push("/login")
          
            }catch(error:any){
                message.error(error.response.data.message || error.message)
            }
      }

      useEffect(()=>{
        
        if(pathname !== "/login" && pathname !== "/register"){

        getCurrentUser();

        }
      },[pathname])



  return (
         <html lang="en">
        <body>
 
            <ConfigProvider theme={
                {
                    token:{
                        colorPrimary:"#000",
                    },
                }
            }>
              {pathname !== "/login" && pathname !== "/register" &&   (
                     <nav>
                     <div className='nav-left'>
                         <h2 onClick={()=>{
                         router.push("/")
                     }}>RENTcar.com</h2>
                     </div>
                     <div className='nav-right'>
                     <div className='nav-profile' onClick={()=>{
                         router.push("/profile")
                     }}>{currentUser?.name}</div>
                     <div className='nav-logout' onClick={onLogout}>logout</div>
                     </div>
                     
                 </nav>
              )}
           
                
                {children}
                
            </ConfigProvider>
        </body>
        </html> 
     
    
  )
}

export default LayoutProvider
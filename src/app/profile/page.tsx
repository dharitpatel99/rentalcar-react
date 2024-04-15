"use client"
import Cars from '@/components/profile/Cars'
import General from '@/components/profile/General'
import { UserBooking } from '@/components/profile/UserBooking'
import Users from '@/components/profile/Users'
import { Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {

    const {currentUser} = useSelector((state:any)=>state.users)
  return (
    <>
   {currentUser && (<div className="p-5">
        <Tabs defaultActiveKey='1'>
            {currentUser.isAdmin == false && 
            (<>
            <TabPane tab="General" key="1"><General /></TabPane>
            <TabPane tab="Bookings" key="2"><UserBooking /></TabPane>
            </>)
            }

{currentUser.isAdmin == true && 
            (<>
            <TabPane tab="General" key="1"><General /></TabPane>
            <TabPane tab="Bookings" key="2"><UserBooking /></TabPane>
            <TabPane tab="Users" key="3"><Users /></TabPane>
            <TabPane tab="Cars" key="4"><Cars /></TabPane>
            </>)
            }

        </Tabs>
    </div>)}

    
    </>
  )
}

export default page
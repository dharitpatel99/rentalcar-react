import { validation } from '@/helpers/validation'
import { Form, Modal, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'

const CarForm = ({showCarModal,setShowCarModal,reloadData,selectedCar}:any) => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onFinish = async(values:any)=>{

        try{
            console.log("imgwsss");
            
            values.carImage = values.carImage.replace("C:\\fakepath\\", "images\\");
            
            let response = null;
            if(selectedCar){
                values._id=selectedCar._id;

                response=await axios.put(`/api/cars/${selectedCar._id}`,values);
            }else{
                response=await axios.post(`/api/cars`,values);

            }
            console.log(response);
            reloadData()
            message.success(response.data.message);
            setShowCarModal(false);
        }catch(error:any){
            console.log("hii");
            
            message.success(error.message);

        }
    }
  return (
    <>
    <Modal
    open={showCarModal}
    onCancel={()=>setShowCarModal(false)}
    centered
    onOk ={()=>form.submit()}
    >
    <h1>{selectedCar ? 'Edit Car' : 'Add Car'}</h1>
    <Form onFinish={onFinish} form={form} initialValues={selectedCar}>
        <FormItem label='Car Name' name='name' rules={validation}>
            <input type='text' />
        </FormItem>
        <FormItem label='Brand' name='brand' rules={validation}>
            <input type='text' />
        </FormItem>
        <FormItem label='Fuel Type' name='fuelType' rules={validation}>
            <select>
                <option value="">Select Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
            </select>
        </FormItem>
        <FormItem label='Rent per Hour' name='rentPerHour' rules={validation}>
            <input type='text' />
        </FormItem>
        <FormItem label='Car Image' name='carImage' rules={validation}>
            <input type='file'/>
        </FormItem>
    </Form>
    </Modal>
    </>
  )
}

export default CarForm
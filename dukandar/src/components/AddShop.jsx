import React, {useState} from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../AxiosInstance'

const AddShop = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const handleAddShop = async (e) => {
    e.preventDefault();
    const shopData = {
      name, address, description, email, phone
    } 

    try {
      const response = await axiosInstance.post('http://localhost:8000/api/v1/shop/', shopData)
      console.log('response.data', response.data)
      navigate('/')
    } catch(error) {
      console.log('error.data', error.response.data)
      // setError('Invalid Credentials')
    }finally{
      console.log('Shop Created Successfully...!!!')

      // setLoading(false)
    }
  }
  return (
    <>
      <h3 className='text-right'>Add Shop</h3>
      <hr/>
      <form onSubmit={handleAddShop}>
        <div className="row">
          <div className="col-6 mb-3">
            <div className="form-group mb-3">
              <label className='mb-2'>Shop Name</label>
              <input type="text" className="form-control" value={name}  onChange={(e)=>setName(e.target.value)}  aria-describedby="name" placeholder="Enter Shop Name"/>
            </div>
            <div className="form-group">
                <label  className='mb-2'>Phone Number</label>
                <input type="number" className="form-control"  value={phone}  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter Phone Number"/>
            </div>
            {/* <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
          </div>
          <div className="col-6">
            <div className="form-group mb-3">
              <label className='mb-2'>Email address</label>
              <input type="email" className="form-control"  value={email}  onChange={(e)=>setEmail(e.target.value)}  aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label className='mb-2'>Shop Address</label>
              <input type="text" className="form-control" value={address}  onChange={(e)=>setAddress(e.target.value)}  aria-describedby="shopaddress" placeholder="Enter Shop Address"/>
            </div>
          </div>
          <div className="form-group mb-4">
              <label  className='mb-2'>Shop Description</label>
              <textarea className="form-control"  value={description}  onChange={(e)=>setDescription(e.target.value)} rows="3" placeholder="Enter Shop Description"></textarea>
            </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary  me-md-2">Submit</button>
          </div>
      </form>
    </>
  )
}

export default AddShop

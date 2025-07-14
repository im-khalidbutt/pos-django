import React, {useEffect, useState } from 'react'
import axiosInstance from '../AxiosInstance'

import { Link } from 'react-router-dom'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [shopData, setShopData] = useState([]);
    const [selectedShop, setSelectedShop] = useState(null); // shop to delete
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {
        axiosInstance.get('http://localhost:8000/api/v1/shop/')
        .then(response => {
            setShopData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])

    const handleDeleteClick = (shop) => {
        setSelectedShop(shop);
        setShowModal(true);
      };

    const handleShopDelete = async (e) => {
        e.preventDefault();
        const shopId=selectedShop.id
        const shop_uuid = {shopId}
        try {
            const response = await axiosInstance.post(`http://localhost:8000/api/v1/shop/${shopId}/`, {
                shop_uuid, // wrap in `data`
            });
            setShopData(prevShops => prevShops.filter(shop => shop.id !== shopId));
            console.log('response.data', response)
            setShowModal(false);
            setSelectedShop(null);
          } catch(error) {
            console.log('error:', error.response?.data || error.message);
          }finally{
            console.log('Shop delete Successfully...!!!')
          }
    }

  return (
    
    <>
        <div className='row'>
            <div className="col-6">
                <h3 className='text-left'>Shops List</h3>
            </div>
            <div className="col-6 right-inline">
            {user?.is_superuser && (
                <>
                    <h3 className='text-right'>Add New Shop</h3>
                    <Link className="btn btn-success" to='/addshop'>New</Link>
                </>
                )}
            </div>
        </div>
        <br />
        <div className="col">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {shopData.map((item) => (
                        <tr key={item.id}>
                            <td ><Link style={{ textDecoration: 'none', color: 'blue' }}  to={`/shop/${item.id}`} >{item.name}</Link></td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.is_active
                                ? <span style={{ color: '#128232' }}>Active</span>
                                : <span style={{ color: 'red' }}>In-Active</span>}</td>
                            <td><Link className="btn btn-sm btn-info" value={item.id} to={`/edit-shop/${item.id}`}>Edit</Link> &nbsp;
                            {user?.is_superuser && (
                                <>
                                    
                            <button className="btn btn-sm btn-danger" value={item.id} onClick={() => handleDeleteClick(item)}>Delete</button>
                                </>
                                )}</td>
                        </tr> 
                    ))}
                    {shopData.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">No shops found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Confirmation Modal */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete the shop <strong>{selectedShop?.name}</strong>?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleShopDelete}>Yes, Delete</button>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
        
    </>
  )
}

export default Home

// ShopDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../AxiosInstance'

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`http://localhost:8000/api/v1/shop/${id}`)
      .then(res => {
        setShop(res.data);
      })
      .catch(err => {
        setError('Shop not found.');
        console.error(err);
      });
  }, [id]);

  if (error) return <div className="text-danger">{error}</div>;
  if (!shop) return <div>Loading...</div>;
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shop Detail</h2>
      <hr/>
      <p><strong>Name:</strong> {shop.name}</p>
      <p><strong>Email:</strong> {shop.email}</p>
      <p><strong>Status:</strong> {shop.is_active ? <span style={{ color: '#128232' }}>Active</span>
                                : <span style={{ color: 'red' }}>In-Active</span>}</p>
      <p><strong>Phone:</strong> {shop.phone}</p>
      <p><strong>Address:</strong> {shop.address}</p>
      <p><strong>Description:</strong> {shop.description}</p>
    </div>
  );
};

export default ShopDetail;

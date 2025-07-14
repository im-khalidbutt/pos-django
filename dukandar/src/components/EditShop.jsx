import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInstance'

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`http://localhost:8000/api/v1/shop/${id}/`)
      .then(res => setShop(res.data))
      .catch(err => {
        setError('Shop not found.');
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShop(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedShop = {
        name: shop.name,
        email: shop.email,
        phone: shop.phone,
        address: shop.address,
        description: shop.description,
        is_active: shop.is_active,
    };
    try {
      await axiosInstance.put(`http://localhost:8000/api/v1/shop/${id}/`, updatedShop);
      navigate('/'); // or redirect to detail page
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
    //   alert('Error updating shop');
    }
  };

  if (error) return <div className="text-danger">{error}</div>;
  if (!shop) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Shop</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 mb-3">
            <div className="form-group mb-3">
              <label className='mb-2'>Shop Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={shop.name}
                onChange={handleChange}
                placeholder="Enter Shop Name"
              />
            </div>
            <div className="form-group">
              <label className='mb-2'>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={shop.phone || ''}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="form-group form-check mt-3">
              <input
                type="checkbox"
                name="is_active"
                checked={shop.is_active}
                onChange={handleChange}
                className="form-check-input"
              />
              <label className="form-check-label">Shop Active</label>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group mb-3">
              <label className='mb-2'>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={shop.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label className='mb-2'>Shop Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={shop.address}
                onChange={handleChange}
                placeholder="Enter Shop Address"
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label className='mb-2'>Shop Description</label>
            <textarea
              name="description"
              className="form-control"
              value={shop.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter Shop Description"
            ></textarea>
          </div>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary me-md-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditShop;

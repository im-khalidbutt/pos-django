import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axiosInstance from '../AxiosInstance';


const AddItem = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const shop_id = user.shop_id
    const [initialOptions, setInitialOptions] = useState([]);
    const [itemCategory, setitemCategory] = useState([]);
    useEffect(() => {
        const fetchInitial = async () => {
          try {
            const res = await axiosInstance.get('http://127.0.0.1:8000/api/v1/company/');
            const options = res.data.map(item => ({
              label: item.name,
              value: item.id
            }));
            setInitialOptions(options);
          } catch (error) {
            console.error('Error loading default options', error);
          }
        };

        const fetchitemCategory = async () => {
            try {
              const res = await axiosInstance.get(`http://127.0.0.1:8000/api/v1/shop/${shop_id}/item-category`);
              const options = res.data.map(item => ({
                label: item.name,
                value: item.id
              }));
              setitemCategory(options);
            } catch (error) {
              console.error('Error loading default options', error);
            }
          };
    
        fetchInitial();
        fetchitemCategory();
      }, []);

    const loadOptions = async (inputValue, callback) => {
        try {
          const response = await axiosInstance.get(`http://127.0.0.1:8000/api/v1/company/?search=${inputValue}`);
          const data = response.data;
          const formatted = data.map(item => ({
            label: item.name,   // or whatever field you want
            value: item.uuid,     // must be unique
          }));
          callback(formatted);
        } catch (error) {
          console.error('Error loading options:', error);
          callback([]);
        }
      };

      const loadItemCategory = async (inputValue, callback) => {
        try {
          const response = await axiosInstance.get(`http://127.0.0.1:8000/api/v1/shop/${shop_id}/item-category?search=${inputValue}`);
          const data = response.data;
          const formatted = data.map(item => ({
            label: item.name,   // or whatever field you want
            value: item.uuid,     // must be unique
          }));
          callback(formatted);
        } catch (error) {
          console.error('Error loading options:', error);
          callback([]);
        }
      };
    
  return (
    <>
        <h3 className='text-right mb-3'>Add Item</h3>
        <form >
            <div className="container">
            <div className="row">
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Item Name <strong style={{color:'red'}}>*</strong></label>
                        <input type="text" className="form-control" required  aria-describedby="name" placeholder="Enter Item Name"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Quantity <strong style={{color:'red'}}>*</strong></label>
                        <input type="number" className="form-control" required  aria-describedby="quantity" placeholder="Enter Item Quantity"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Item category</label>
                        <AsyncSelect
                            cacheOptions
                            // menuIsOpen={true}
                            defaultOptions={itemCategory} // 👈 This enables dropdown options on page load
                            loadOptions={loadItemCategory}
                            placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                    <label className="form-label">Select Company</label>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={initialOptions} // 👈 This enables dropdown options on page load
                        loadOptions={loadOptions}
                        placeholder="Search..."
                        />
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Buying Price <strong style={{color:'red'}}>*</strong></label>
                        <input type="text" className="form-control" required aria-describedby="buying" placeholder="Enter Buying Price"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Selling Price <strong style={{color:'red'}}>*</strong></label>
                        <input type="text" className="form-control" required aria-describedby="selling" placeholder="Enter Selling Price"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Barcode <strong style={{color:'red'}}>*</strong></label>
                        <input type="text" className="form-control" required aria-describedby="Barcode" placeholder="Enter Barcode"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Supply Rate <strong style={{color:'red'}}>*</strong></label>
                        <input type="text" className="form-control" required aria-describedby="supply" placeholder="Enter Supply Rate"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Tax Percentage</label>
                        <input type="number" min={0} max={100} className="form-control"  aria-describedby="tax" placeholder="Enter Tax Percentage"/>
                    </div>
                </div>
                <div className="col-6 mb-3">
                    <div className="form-group mb-3">
                        <label className='mb-2'>Formula</label>
                        <input type="text" className="form-control"  aria-describedby="formula" placeholder="Enter Formula"/>
                    </div>
                </div>

                {/* <div className="col-6">

                </div> */}
            </div>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary me-md-2 mb-3">Submit</button>
            </div>
        </form>
    </>
  )
}

export default AddItem

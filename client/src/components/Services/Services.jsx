import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './services.css';
import io from 'socket.io-client';
const SERVER_URL = process.env.SERVER_URL || 'localhost:3001';
const socket = io(SERVER_URL, { transports: ['websocket'] });

function Services() {
  // const API = 'http://localhost:3001';
  const authSettings = useContext(AuthContext);
  console.log(authSettings);

  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [powerUnit, setPowerUnit] = useState('');
  const [description, setDescription] = useState('');
  // const [servicesList, setServicesList] = useState([]);

  const handleBrand = (event) => {
    setCarBrand(event.target.value);
  };

  const handleModel = (event) => {
    setCarModel(event.target.value);
  };

  const handlePowerUnit = (event) => {
    setPowerUnit(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ticket`);
      });
    });
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      carBrand: carBrand,
      carModel: carModel,
      powerUnit: powerUnit,
      description: description,
      created_at: Date.now(),
    };
    console.log('hello', payload);
    socket.emit('createTicket', payload);
  };

  // const handleSubmit = async (event, _id) => {
  //   try {
  //     event.preventDefault();
  //     const data = {
  //       _id: _id,
  //       carBrand: carBrand,
  //       carModel: carModel,
  //       description: description,
  //       powerUnit: powerUnit
  //     };
  //     const id = authSettings.user.id;
  //     const response = await axios.post(`${API}/service/${id}`,data);
  //     setServicesList([...servicesList, response]);
  //     console.log(servicesList);
  //   } catch (error) {
  //     console.error('Adding Error', error);
  //   }
  // };

  return (
    <div>
      <div className = 'add-service-container'>
        <h1>How Can We Help You?</h1>
        <form onSubmit = {handleSubmit}>
          <div className="row add1">
            <div className="col">
              <label>Car Brand</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">#</div>
                </div>
                <input value = {carBrand} onChange = {handleBrand} type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Service carBrand"/>
              </div>
            </div>
            <div className="col">
              <label>Car Model</label>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input value = {carModel} onChange = {handleModel} type = "text" required pattern="^[0-9]+([.])?[0-9]*([0-9]+)?$" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Price"/>
              </div>
            </div>
          </div>
          <div className = 'row'>
            <label>Power Unit</label>
            <div className = 'col'>
              <div className="form-check add1">
                <label>Petrol</label>
                <input name = {powerUnit} onChange = {handlePowerUnit} className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."/>
              </div>
            </div>
            <div className = 'col'>
              <div className="form-check add1">
                <label>Diesel</label>
                <input name = {powerUnit} onChange = {handlePowerUnit} className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."/>
              </div>
            </div>
            <div className = 'col'>
              <div className="form-check add1">
                <label>Electric</label>
                <input name = {powerUnit} onChange = {handlePowerUnit} className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="option1" aria-label="..."/>
              </div>
            </div>
            <div className = 'col'>
              <div className="form-check add1">
                <label>Hybrid</label>
                <input name = {powerUnit} onChange = {handlePowerUnit} className="form-check-input position-static" type="radio" id="blankCheckbox" value="option1" aria-label="..."/>
              </div>
            </div>
          </div>
          <div className="form-group add1">
            <label>Service Description</label>
            <textarea value = {description} onChange = {handleDescription} name="pDesc" className="form-control" id="pDesc"></textarea>
          </div>
          <button type="submit" className='add-ps-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Services;

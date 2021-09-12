import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Ticket from './Ticket';
import './admin.css';

const socket = io('localhost:3001', { transports: ['websocket'] });

function Services() {
  const API = 'http://localhost:3001';

  const [services, setServices] = useState([]);
  const [tickets, setTickets] = useState([]);

  const getServices = async () => {
    const response = await axios.get(`${API}/service`);
    let services = [];
    response.data.forEach((user) =>
      user.services.forEach((service) => services.push(service))
    );
    setServices(services);
  };

  useEffect(() => {
    getServices();
  }, []);

  const handleClaim = (id, socketId) => {
    console.log(socketId);
    socket.emit('claim', { id, studentId: socketId });
  };

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('newTicket', (payload) => {
        setTickets([...tickets, payload]);
      });
    });
  }, [tickets]);
  console.log(tickets);

  return (
    <div className="sevice-con">
      <h2>Services List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Car Brand</th>
            <th>Car Model</th>
            <th>Power Unit</th>
            <th>Description</th>
            <th>Accept Request</th>
            <th>Dismiss Request</th>
          </tr>
        </thead>
        <tbody id="products-list" key={Math.random()}>
          {services.map((service) => {
            return (
              <>
                <tr>
                  <td>{service.carBrand}</td>
                  <td>{service.carModel}</td>
                  <td>{service.powerUnit}</td>
                  <td>{service.description}</td>
                  <td>
                    <button
                      className = 'remove'>&#10004;</button>
                  </td>
                  <td>
                    <button
                      // onClick={() => deleteService(service._id)}
                      className="remove"
                    >
                      &#10008;
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <section id="tickets">
        {tickets.map((ticket) => {
          return (
            <Ticket ticket = {tickets} handleClaim={handleClaim} key={ticket.id} />
          );
        })}
      </section>
    </div>
  );
}

export default Services;

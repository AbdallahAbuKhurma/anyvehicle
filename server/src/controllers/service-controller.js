'use strict';

const Users = require('../auth/models/users');

const getAllServices = (req, res) => {
  try {
    let servicesData = [];
    Users.find({}, (error, data) => {
      data.map((info) => {
        const mapedData = {
          id: info._id,
          userName: info.userName,
          services: info.services,
        };
        servicesData.push(mapedData);
      });
      res.json(servicesData);
    });
  } catch (error) {
    console.error('Get Error', error.message);
  }
};

const getUserServices = (req, res) => {
  try {
    const id = req.params.id;
    Users.find({_id: id}, (error, data) => {
      res.json(data[0].services);
    });
  } catch (error) {
    console.error('Get Error', error.message);
  }
};


const createService = (req, res) => {
  try {
    const id = req.params.id;
    const createdData = req.body;
    Users.find({_id: id}, (error, data) => {
      data.map((info) => {
        console.log('========',info);
        info.services.push(createdData);
        info.save();
        res.json(info.services);
      });
    });
  } catch (error) {
    console.error('Create Error', error.message);
  }
};

// const updateService = (req, res) => {
//   try {
//     const id = req.params.id;
//     const {carBrand, carModel, powerUnit, description} = req.body;
//     Users.find({_id: id}, (error, data) => {
//       data[0].services.map((service) => {
//         if(service._id !== req.body.id){
//           console.log('11111111111',String(service._id));
//           console.log('22222222222',req.body.id);
//           data[0].services.splice(req.body.id, 1, {
//             carBrand: carBrand,
//             carModel: carModel,
//             powerUnit: powerUnit,
//             description: description,
//           });
//         }
//         data[0].save();
//         res.json(data[0]);
//       });
//     });
//   } catch (error) {
//     console.error('Update Error', error.message);
//   }
// };

// const updateService = (req, res) => {
//   try {
//     let serviceData = [];
//     const id = req.params.id;
//     const {carBrand, carModel, powerUnit, description} = req.body;
//     Users.find({_id: id}, (error, data) => {
//       data.map((info) => {
//         const mapedData = {
//           services: info.services,
//         };
//         serviceData.push(mapedData);
//       });
//       serviceData.map((data) => {
//         data.services.map((service) => {
//           if(String(service._id) === req.body.id){
//             console.log(service);
//             service.splice(req.body.id, 1, {
//               carBrand: carBrand,
//               carModel: carModel,
//               powerUnit: powerUnit,
//               description: description,
//             });
//           }
//         });
//       });
//       res.json(data[0]);
//       data[0].save();
//     });
//   } catch (error) {
//     console.error('Update Error', error.message);
//   }
// };


const updateService = async (req, res) => {
  
  try {
    const id = req.params.id;
    let ServiceArray = [];
    let count = 0;

    Users.find({ _id: id }, (error, data) => {
      ServiceArray = data[0].services;
      data[0].services.map((info) => {
        count++;
        if (info._id == req.body.id) {
          let idx = count - 1;
          ServiceArray[idx] = req.body;
          data[0].services = ServiceArray;
          data[0].save();
          res.json(data[0]);
        }
      });
    });
  } catch (error) {
    res.json('user not found');
  }
};


// const deleteService = (req, res) => {
//   try {
//     const id = req.params.id;
//     const serviceId = req.body._id;
//     console.log(serviceId);
//     Users.find({_id: id}, (error, data) => {
//       data[0].services.filter((serviceId) => {
//         return serviceId !== serviceId;
//       });
//       res.json(data[0]);
//     });
//   } catch (error) {
//     console.error('Delete Error', error.message);
//   }
// };

const deleteService = async (req, res) => {
  const id = req.params.id;

  let ServiceArray = [];
  let productArray = [];
  let idStatus;
  let count = 0;

  try {
    Users.find({ _id: id }, (error, data) => {
      ServiceArray = data[0].services;
      data[0].services.map((info) => {
        if (info._id !== req.body.id) {
          count++;
          idStatus = 'False';
        }
        if (info._id == req.body.id) {
          let idx = count - 1;
          idStatus = 'True';
          ServiceArray.splice(idx, 1);
          data[0].services = ServiceArray;
        }
      });
      // to update the user products
      if (idStatus == 'False') {
        productArray = data[0].services;
        data[0].services.map((info) => {
          if (info._id !== req.body.id) {
            idStatus == 'False';
            count++;
          }
          if (info._id == req.body.id) {
            let idx = count - 1;
            idStatus = 'True';
            productArray.splice(idx, 1);
            data[0].services = productArray;
          }
        });
      }

      // to send the request to the frontend
      if (idStatus == 'True') {
        data[0].save();
        idStatus = 0;
        res.json(data[0]);
      }
      if (idStatus == 'False') {
        res.json('you can not delete this service / product - not found');
      }
    });
  } catch (error) {
    res.json('user not found');
  }
};

module.exports = {
  getAllServices,
  getUserServices,
  createService,
  updateService,
  deleteService,
};

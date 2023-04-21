import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { getAllBikes } from "../redux/actions/bikesActions";

import { Col, Row, Divider, DatePicker, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {

  const [carcollection, setCarCollection] = useState("");
  const { cars } = useSelector((state) => state.carsReducer);
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const [totalBikes, setTotalbikes] = useState([]);

  const dispatch = useDispatch();

  function onChangeValue(event) {
    setCarCollection(event.target.value);
    dispatch(getAllCars());
    dispatch(getAllBikes());

    console.log(event.target.value);
  }

  function onChangeValuebikes(event) {
    setCarCollection(event.target.value);
    dispatch(getAllBikes());

    console.log(event.target.value);
  }

  useEffect(() => {
    setTotalbikes(bikes);
  }, [bikes]);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalcars(temp);
  }

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var bike of bikes) {
      if (bike.bookedTimeSlots.length == 0) {
        temp.push(bike);
      } else {
        for (var booking of bike.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(bike);
          }
        }
      }
    }

    setTotalbikes(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          {/* <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          /> */}
        </Col>
      </Row>

      {totalCars == true && <Spinner />}
      <h5> Here You can choose any types of cars or bikes category</h5>
      <input
        className="inputclass"
        type="radio"
        onChange={onChangeValue}
        name="carcollection"
        value="cars"
        checked={carcollection === "cars"}
      />
      <label> Choose Cars Category</label>
      <br></br>
      <input
        type="radio"
        className="inputclass"
        onChange={onChangeValuebikes}
        name="carcollection"
        value="bikes"
        checked={carcollection === "bikes"}
      />
      <label>Choose Bikes Category</label>

      {carcollection == "cars" ? (
        <Row justify="center" gutter={14}>
          {totalCars.map((car) => {
            return (
              <Col lg={8} sm={24} xs={24}>
                <div className="car p-2 bs1">
                  <img src={car.image} className="carimg" />

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p>{car.name}</p>
                      <p> Rent Per Hour {car.rentPerHour} /-</p>
                    </div>

                    <div>
                      <button className="btn1 mr-2">
                        <Link to={`/booking/${car._id}`}>Book Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row justify="center" gutter={14}>
          {totalBikes.map((bike) => {
            return (
              <Col lg={8} sm={24} xs={24}>
                <div className="car p-2 bs1">
                  <img src={bike.image} className="carimg" />

                  <div className="car-content d-flex align-items-center justify-content-between">
                    <div className="text-left pl-2">
                      <p>{bike.name}</p>
                      <p> Rent Per Hour {bike.rentPerHour} /-</p>
                    </div>

                    <div>
                      <button className="btn1 mr-2">
                        <Link to={`/booking1/${bike._id}`}>Book Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </DefaultLayout>
  );
}

export default Home;

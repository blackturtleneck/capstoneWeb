import React from 'react';
import { Card, ListItem, Button } from 'react'
import MapContainer from './MapContainer'
import Slider from 'react-slick'

class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.restaurantDetails = [];
    this.listOfLocations = [];
    this.state = {
      data: null
    };
  }

  // api call - needs to be put in config file
  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
    this.setState({lat: newProps.lat, lon: newProps.lon});
    this.loadData();
}

  loadData() {
    console.log("LOAD DATA CHECK", this.state.lon);
    var lat = this.state.lat;
    var lon = this.state.lon;
    var sentence = "https://developers.zomato.com/api/v2.1/geocode?lat=47.3536&lon=" + lon
    fetch("https://developers.zomato.com/api/v2.1/geocode?lat=47.659728&lon=-122.317068", {
      headers: {
        "Accept": "application/json",
        "user-key": "1b8bf5702241de94be0cba6b8772d29e"
      }
    }).then(response => response.json())
      .then(data => {
        this.extractLocations(data.nearby_restaurants);
        this.extractRestaurantDetails(data.nearby_restaurants);
        this.setState({
          data: data.nearby_restaurants
        });
      })
  }

  // get the addresses of restuarants to be able to say how close/far they are to you both
  extractLocations = (restaurants) => {
    for (let restaurant of restaurants) {
      this.listOfLocations.push(restaurant.restaurant.location);
      // console.log(restaurant.restaurant.location)
    }
  }

  // get the details of restuarant
  extractRestaurantDetails = (restaurants) => {
    for (let restaurant of restaurants) {
      let {
        name, cuisines, has_online_delivery,
        is_delivering_now, has_table_booking,
        book_url, order_url,
        price_range, user_rating,
        url, thumb, location, average_cost_for_two,
        menu_url
      } = restaurant.restaurant;
      this.restaurantDetails.push({
        name: name, cuisines: cuisines,
        has_online_delivery: has_online_delivery,
        is_delivering_now: is_delivering_now,
        has_table_booking: has_table_booking,
        book_url: book_url, order_url: order_url,
        price_range: price_range, user_rating: user_rating,
        url: url, thumb: thumb, location: location,
        average_cost_for_two: average_cost_for_two,
        show_order_url: (has_online_delivery && is_delivering_now),
        menu_url: menu_url
      });
    }

  }
  render() {
    console.log("TEST", this.state.lat)
    console.log("TEST2", this.state.lon)
    if (!this.state.data) {
      return <div> Your dates are loading! </div>
    }
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>


        <MapContainer data={this.state.data} lat ={this.state.lat} lon = {this.state.lon} />
        The following are date spots located halfway between you and your date! Price range is ranked
        from 1 - 4 (4 being the most expensive).

          <br />
        <button className="button" type="button"> {this.restaurantDetails['0'].name} </button>
        <button className="button" type="button"> {this.restaurantDetails['1'].name} </button>
        <button className="button" type="button"> {this.restaurantDetails['2'].name} </button>
        <button className="button" type="button"> {this.restaurantDetails['3'].name} </button>
        <button className="button" type="button"> {this.restaurantDetails['4'].name} </button>


        <d1>
          <dt> {this.restaurantDetails['0'].name} </dt>
          <dd> Cuisine Type: {this.restaurantDetails['0'].cuisines} </dd>
          <dd> Price Range: {this.restaurantDetails['0'].price_range} </dd>
          <dt> {this.restaurantDetails['1'].name} </dt>
          <dd> Cuisine Type: {this.restaurantDetails['1'].cuisines} </dd>
          <dd> Price Range: {this.restaurantDetails['1'].price_range} </dd>
          <dt> {this.restaurantDetails['2'].name} </dt>
          <dd> Cuisine Type: {this.restaurantDetails['2'].cuisines} </dd>
          <dd> Price Range: {this.restaurantDetails['2'].price_range} </dd>
          <dt> {this.restaurantDetails['3'].name} </dt>
          <dd> Cuisine Type: {this.restaurantDetails['3'].cuisines} </dd>
          <dd> Price Range: {this.restaurantDetails['3'].price_range} </dd>
          <dt> {this.restaurantDetails['4'].name} </dt>
          <dd> Cuisine Type: {this.restaurantDetails['4'].cuisines} </dd>
          <dd> Price Range: {this.restaurantDetails['4'].price_range} </dd>
        </d1>
      </div>
    );
  }

}
export default Dates;
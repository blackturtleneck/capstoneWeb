import React from 'react';
// import { Card, ListItem, Button } from 'react';
import MapContainer from './MapContainer';
// import Slider from 'react-slick';

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
        this.loadData();
    }
    loadData() {
        fetch(
            'https://developers.zomato.com/api/v2.1/geocode?lat=47.656491&lon=-122.30736',
            {
                headers: {
                    Accept: 'application/json',
                    'user-key': '1b8bf5702241de94be0cba6b8772d29e'
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                this.extractLocations(data.nearby_restaurants);
                this.extractRestaurantDetails(data.nearby_restaurants);
                this.setState({
                    data: data.nearby_restaurants
                });
            });
    }

    showAlert() {
        alert('Hello World');
    }

    // get the addresses of restuarants to be able to say how close/far they are to you both
    extractLocations(restaurants) {
        for (let restaurant of restaurants) {
            this.listOfLocations.push(restaurant.restaurant.location);
            // console.log(restaurant.restaurant.location)
        }
    }

    // get the details of restuarant
    extractRestaurantDetails(restaurants) {
        for (let restaurant of restaurants) {
            let {
                name,
                cuisines,
                has_online_delivery,
                is_delivering_now,
                has_table_booking,
                book_url,
                order_url,
                price_range,
                user_rating,
                url,
                thumb,
                location,
                average_cost_for_two,
                menu_url
            } = restaurant.restaurant;
            this.restaurantDetails.push({
                name: name,
                cuisines: cuisines,
                has_online_delivery: has_online_delivery,
                is_delivering_now: is_delivering_now,
                has_table_booking: has_table_booking,
                book_url: book_url,
                order_url: order_url,
                price_range: price_range,
                user_rating: user_rating,
                url: url,
                thumb: thumb,
                location: location,
                average_cost_for_two: average_cost_for_two,
                show_order_url: has_online_delivery && is_delivering_now,
                menu_url: menu_url
            });
        }
    }
    render() {
        if (!this.state.data) {
            return <div> Your dates are loading! </div>;
        }
        // const settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        // };

        return (
            <div>
                <MapContainer data={this.state.data} />
                The following are date spots located halfway between you and
                your date! Price range is ranked from 1 - 4 (4 being the most
                expensive).
                <br />
                <button className="button" type="button">
                    {' '}
                    {this.restaurantDetails['0'].name}{' '}
                </button>
                <button className="button" type="button">
                    {' '}
                    {this.restaurantDetails['1'].name}{' '}
                </button>
                <button className="button" type="button">
                    {' '}
                    {this.restaurantDetails['2'].name}{' '}
                </button>
                <button className="button" type="button">
                    {' '}
                    {this.restaurantDetails['3'].name}{' '}
                </button>
                <button className="button" type="button">
                    {' '}
                    {this.restaurantDetails['4'].name}{' '}
                </button>
                <dl>
                    <dt> {this.restaurantDetails['0'].name} </dt>
                    <dd>
                        {' '}
                        Cuisine Type: {
                            this.restaurantDetails['0'].cuisines
                        }{' '}
                    </dd>
                    <dd>
                        {' '}
                        Price Range: {
                            this.restaurantDetails['0'].price_range
                        }{' '}
                    </dd>
                    <dt> {this.restaurantDetails['1'].name} </dt>
                    <dd>
                        {' '}
                        Cuisine Type: {
                            this.restaurantDetails['1'].cuisines
                        }{' '}
                    </dd>
                    <dd>
                        {' '}
                        Price Range: {
                            this.restaurantDetails['1'].price_range
                        }{' '}
                    </dd>
                    <dt> {this.restaurantDetails['2'].name} </dt>
                    <dd>
                        {' '}
                        Cuisine Type: {
                            this.restaurantDetails['2'].cuisines
                        }{' '}
                    </dd>
                    <dd>
                        {' '}
                        Price Range: {
                            this.restaurantDetails['2'].price_range
                        }{' '}
                    </dd>
                    <dt> {this.restaurantDetails['3'].name} </dt>
                    <dd>
                        {' '}
                        Cuisine Type: {
                            this.restaurantDetails['3'].cuisines
                        }{' '}
                    </dd>
                    <dd>
                        {' '}
                        Price Range: {
                            this.restaurantDetails['3'].price_range
                        }{' '}
                    </dd>
                    <dt> {this.restaurantDetails['4'].name} </dt>
                    <dd>
                        {' '}
                        Cuisine Type: {
                            this.restaurantDetails['4'].cuisines
                        }{' '}
                    </dd>
                    <dd>
                        {' '}
                        Price Range: {
                            this.restaurantDetails['4'].price_range
                        }{' '}
                    </dd>
                </dl>
            </div>
        );
    }
}
export default Dates;

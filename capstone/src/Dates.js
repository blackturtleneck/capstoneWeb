import React from 'react';
// input cuisine preferences
// finds midpoint location between two people (??)
// using a 




class Dates extends React.Component {
	constructor(props) {
		super(props);
    this.restaurantDetails = [];
    this.listOfLocations = [];
  }
  // api call - needs to be put in config file
	componentDidMount() {
		fetch("https://developers.zomato.com/api/v2.1/geocode?lat=47.6535114262&lon=-122.352",{
			headers: {
			    "Accept": "application/json",
			    "user-key": "1b8bf5702241de94be0cba6b8772d29e"
			}
			}).then(response => response.json())
			.then(data => {
        this.extractLocations(data.nearby_restaurants);
        this.extractRestaurantDetails(data.nearby_restaurants);
			})
  }
  
  // get the addresses of restuarants to be able to say how close/far they are to you both
   extractLocations = (restaurants) => {
    for(let restaurant of restaurants) {
      this.listOfLocations.push(restaurant.restaurant.location);
      console.log(restaurant.restaurant.location)
    }
  }

  // get the details of restuarant
  extractRestaurantDetails = (restaurants) => {
    for(let restaurant of restaurants) {
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
    return (
      <div className="dategen">
        I'm a date generator 
      </div>
    );
  }
}

export default Dates;

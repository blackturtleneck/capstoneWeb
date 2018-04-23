// Initialize zomato
import zomato from 'zomato';

const config = {
    userKey: '1b8bf5702241de94be0cba6b8772d29e'
};

client.getCities(
    {
        q: 'New Delhi', //query by city name
        lat: '28.613939', //latitude
        lon: '77.209021', //longitude
        city_ids: '1,2,3', //comma separated city_ids value
        count: '2' // number of maximum result to display
    },
    function(err, result) {
        if (!err) {
            // console.log(result);
        } else {
            // console.log(err);
        }
    }
);

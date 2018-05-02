import React from 'react';
import { auth } from '../FirestoreConfig';
import './SignUp.css';
import next from '../img/next.svg';
import back from '../img/back.svg';

class SignUp3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content,

            coffee: false,
            dinner: false,
            drinks: false,
            museum: false,
            show: false,
            park: false,

            travel: false,
            food: false,
            music: false,
            sports: false,
            movies: false,
            tech: false,
            gaming: false,
            nature: false,
            animals: false
        };
        this.nextStep = this.nextStep.bind(this);

        this.toggleCoffee = this.toggleCoffee.bind(this);
        this.toggleDrinks = this.toggleDrinks.bind(this);
        this.toggleDinner = this.toggleDinner.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
        this.toggleMuseum = this.toggleMuseum.bind(this);
        this.togglePark = this.togglePark.bind(this);

        this.toggleAnimals = this.toggleAnimals.bind(this);
        this.toggleTravel = this.toggleTravel.bind(this);
        this.toggleFood = this.toggleFood.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
        this.toggleMovies = this.toggleMovies.bind(this);
        this.toggleSports = this.toggleSports.bind(this);
        this.toggleTech = this.toggleTech.bind(this);
        this.toggleGaming = this.toggleGaming.bind(this);
        this.toggleNature = this.toggleNature.bind(this);
    }

    logout() {
        auth.signOut();
    }

    // Dates Types
    toggleCoffee() {
        const currentState = this.state.coffee;
        this.setState({ coffee: !currentState });
    }
    toggleDinner() {
        const currentState = this.state.dinner;
        this.setState({ dinner: !currentState });
    }
    toggleDrinks() {
        const currentState = this.state.drinks;
        this.setState({ drinks: !currentState });
    }
    toggleShow() {
        const currentState = this.state.show;
        this.setState({ show: !currentState });
    }
    togglePark() {
        const currentState = this.state.park;
        this.setState({ park: !currentState });
    }
    toggleMuseum() {
        const currentState = this.state.museum;
        this.setState({ museum: !currentState });
    }

    // Topic Types
    toggleFood() {
        const currentState = this.state.food;
        this.setState({ food: !currentState });
    }
    toggleAnimals() {
        const currentState = this.state.animals;
        this.setState({ animals: !currentState });
    }
    toggleTravel() {
        const currentState = this.state.travel;
        this.setState({ travel: !currentState });
    }
    toggleMusic() {
        const currentState = this.state.music;
        this.setState({ music: !currentState });
    }
    toggleSports() {
        const currentState = this.state.sports;
        this.setState({ sports: !currentState });
    }
    toggleMovies() {
        const currentState = this.state.movies;
        this.setState({ movies: !currentState });
    }
    toggleTech() {
        const currentState = this.state.tech;
        this.setState({ tech: !currentState });
    }
    toggleGaming() {
        const currentState = this.state.gaming;
        this.setState({ gaming: !currentState });
    }
    toggleNature() {
        const currentState = this.state.nature;
        this.setState({ nature: !currentState });
    }

    render() {
        return (
            <div class="signup-page">
                <img
                    src={back}
                    className="back back-3"
                    onClick={this.props.previousStep}
                    alt="back"
                />
                <div className="next-step next next-3">
                    <img className="next next-3" src={next} alt="next" />
                </div>
                <div className="tagline-3">PICK YOUR DATE PREFERENCES</div>
                <div className="date-header">
                    ON A FIRST DATE I'D LIKE TO...
                </div>
                <div className="date-row">
                    <div
                        className={
                            this.state.coffee ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleCoffee}
                    >
                        <i className="fas fa-coffee date-icon">{''}</i>
                        <br />
                        GET COFFEE
                    </div>
                    <div
                        className={
                            this.state.drinks ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleDrinks}
                    >
                        <i className="fas fa-glass-martini date-icon">{''}</i>
                        <br />
                        GET DRINKS
                    </div>
                    <div
                        className={
                            this.state.dinner ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleDinner}
                    >
                        <i className="fas fa-utensils date-icon">{''}</i>
                        <br />
                        GET DINNER
                    </div>
                </div>
                <div className="date-row">
                    <div
                        className={
                            this.state.museum ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleMuseum}
                    >
                        <i className="fas fa-university date-icon">{''}</i>
                        <br />
                        GO TO A MUSEUM
                    </div>
                    <div
                        className={
                            this.state.show ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleShow}
                    >
                        <i className="fas fa-ticket-alt date-icon">{''}</i>
                        <br />
                        GO TO A SHOW{' '}
                    </div>
                    <div
                        className={
                            this.state.park ? 'date-type active' : 'date-type'
                        }
                        onClick={this.togglePark}
                    >
                        {' '}
                        <i className="fas fa-tree date-icon">{''}</i>
                        <br />
                        GO TO A PARK
                    </div>
                </div>
                <div className="date-header">TALK TO ME ABOUT</div>
                <div className="date-row">
                    <div
                        className={
                            this.state.animals
                                ? 'date-type active'
                                : 'date-type'
                        }
                        onClick={this.toggleAnimals}
                    >
                        <i className="fas fa-paw date-icon">{''}</i>
                        <br />
                        ANIMALS
                    </div>
                    <div
                        className={
                            this.state.travel ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleTravel}
                    >
                        <i className="fas fa-plane date-icon">{''}</i>
                        <br />TRAVELS
                    </div>
                    <div
                        className={
                            this.state.food ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleFood}
                    >
                        {' '}
                        <i className="fas fa-utensils date-icon">{''}</i>
                        <br />FOOD
                    </div>
                </div>
                <div className="date-row">
                    <div
                        className={
                            this.state.music ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleMusic}
                    >
                        {' '}
                        <i className="fas fa-music date-icon">{''}</i>
                        <br />MUSIC
                    </div>
                    <div
                        className={
                            this.state.sports ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleSports}
                    >
                        {' '}
                        <i className="fas fa-futbol date-icon">{''}</i>
                        <br />SPORTS
                    </div>
                    <div
                        className={
                            this.state.movies ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleMovies}
                    >
                        {' '}
                        <i className="fas fa-film date-icon">{''}</i>
                        <br />MOVIES
                    </div>
                </div>
                <div className="date-row">
                    <div
                        className={
                            this.state.tech ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleTech}
                    >
                        {' '}
                        <i className="fas fa-mobile date-icon">{''}</i>
                        <br />TECH
                    </div>
                    <div
                        className={
                            this.state.gaming ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleGaming}
                    >
                        {' '}
                        <i className="fas fa-gamepad date-icon">{''}</i>
                        <br />GAMING
                    </div>
                    <div
                        className={
                            this.state.nature ? 'date-type active' : 'date-type'
                        }
                        onClick={this.toggleNature}
                    >
                        {' '}
                        <i className="fas fa-tree date-icon">{''}</i>
                        <br />NATURE
                    </div>
                </div>
            </div>
        );
    }

    nextStep(e) {
        e.preventDefault();
        // var data = {
        //     matchGender: e.target.matchGender.value,
        //     ageRange: this.state.ageRange,
        //     distance: this.state.distance
        // };
        // console.log('data', data);
        // this.props.saveValues(data);
        this.props.nextStep();
    }
}

export default SignUp3;

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

            coffee: this.props.fieldValues.dates.coffee,
            dinner: this.props.fieldValues.dates.dinner,
            drinks: this.props.fieldValues.dates.drinks,
            museum: this.props.fieldValues.dates.museum,
            show: this.props.fieldValues.dates.show,
            park: this.props.fieldValues.dates.park,

            travel: this.props.fieldValues.topics.travel,
            food: this.props.fieldValues.topics.food,
            music: this.props.fieldValues.topics.music,
            sports: this.props.fieldValues.topics.sports,
            movies: this.props.fieldValues.topics.movies,
            gaming: this.props.fieldValues.topics.gaming,
            nature: this.props.fieldValues.topics.nature,
            animals: this.props.fieldValues.topics.animals,
            tech: this.props.fieldValues.topics.tech
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
            <div className="signup-page">
                <img
                    src={back}
                    className="back back-3"
                    onClick={this.props.previousStep}
                    alt="back"
                />
                <img
                    className="next"
                    src={next}
                    alt="next"
                    onClick={this.nextStep}
                />
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
        var data = {
            dates: {
                coffee: this.state.coffee,
                dinner: this.state.dinner,
                drinks: this.state.drinks,
                museum: this.state.museum,
                show: this.state.show,
                park: this.state.park
            },
            topics: {
                travel: this.state.travel,
                food: this.state.food,
                music: this.state.music,
                sports: this.state.sports,
                movies: this.state.movies,
                gaming: this.state.gaming,
                nature: this.state.nature,
                animals: this.state.animals,
                tech: this.state.tech
            }
        };
        console.log('data', data);
        this.props.saveValues(data);
        this.props.submitRegistration();
    }
}

export default SignUp3;

import React from 'react';
import { auth } from '../FirestoreConfig';
import './SignUp.css';
import next from '../img/next.svg';

class SignUp1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content
        };
        this.nextStep = this.nextStep.bind(this);
    }

    logout() {
        auth.signOut();
    }

    nextStep(e) {
        e.preventDefault();
        var data = {
            name: e.target.name.value,
            gender: e.target.gender.value,
            occupation: e.target.occupation.value,
            education: e.target.education.value,
            religion: e.target.religion.value,
            location: e.target.location.value,
            birthday: {
                month: e.target.month.value,
                day: e.target.day.value,
                year: e.target.year.value
            }
        };

        this.props.saveValues(data);
        this.props.nextStep();
    }
    render() {
        const header = this.props.existingUser ?
            (
                <div>
                    <div className="signup-header-welcome"> EDIT YOUR </div>
                    <div className="signup-header-amp">A M P R</div>
                    <div className="signup-header-welcome-profile">PROFILE</div>
                </div>
            ) : (
                <div>
                    <div className="signup-header-welcome"> WELCOME TO </div>
                    <div className="signup-header-amp">A M P R</div>
                </div>
            )
        console.log("fv", this.props.fieldValues)
        return (
            <div className="signup-page">
                <div className="signup-header">
                    {header}
                    <div className="tagline-1">TELL US ABOUT YOURSELF</div>
                </div>
                <form className="form" onSubmit={this.nextStep}>
                    <div className="next-step next">
                        <input
                            type="image"
                            className="next"
                            src={next}
                            alt="next"
                        />
                    </div>
                    <label className="signup-label" htmlFor="name">
                        NAME
                    </label>
                    <input
                        defaultValue={this.props.fieldValues.name}
                        name="name"
                        type="text"
                        className="form-input"
                        required
                    />
                    <label className="signup-label" htmlFor="gender">
                        GENDER
                    </label>
                    <select
                        defaultValue={this.props.fieldValues.gender}
                        name="gender"
                        className="form-input custom-select"
                        required
                    >
                        <option value="select">select</option>
                        <option value="male">MALE</option>
                        <option value="female">FEMALE</option>
                    </select>
                    <label className="signup-label" htmlFor="birthday">
                        BIRTHDAY
                    </label>
                    <div className="birthday-wrapper" name="birthday">
                        <select
                            defaultValue={this.props.fieldValues.birthday.month}
                            name="month"
                            className="inline-form form-input custom-select"
                            required
                        >
                            <option value="select">select</option>
                            <option value="january">JANUARY</option>
                            <option value="february">FEBRUARY</option>
                            <option value="march">MARCH</option>
                            <option value="april">APRIL</option>
                            <option value="may">MAY</option>
                            <option value="june">JUNE</option>
                            <option value="july">JULY</option>
                            <option value="august">AUGUST</option>
                            <option value="september">SEPTEMBER</option>
                            <option value="october">OCTOBER</option>
                            <option value="novemeber">NOVEMBER</option>
                            <option value="december">DECEMBER</option>
                        </select>
                        <select
                            defaultValue={this.props.fieldValues.birthday.day}
                            name="day"
                            className="inline-form form-input custom-select"
                            required
                        >
                            <option value="select">select</option>
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select
                            required
                            name="year"
                            className="inline-form custom-select form-input year"
                            defaultValue={this.props.fieldValues.birthday.year}
                        >
                            <option value="select">select</option>
                            <option value="1963">1963</option>
                            <option value="1964">1964</option>
                            <option value="1965">1965</option>
                            <option value="1966">1966</option>
                            <option value="1967">1967</option>
                            <option value="1968">1968</option>
                            <option value="1969">1969</option>
                            <option value="1970">1970</option>
                            <option value="1971">1971</option>
                            <option value="1972">1972</option>
                            <option value="1973">1973</option>
                            <option value="1974">1974</option>
                            <option value="1975">1975</option>
                            <option value="1976">1976</option>
                            <option value="1977">1977</option>
                            <option value="1978">1978</option>
                            <option value="1979">1979</option>
                            <option value="1980">1980</option>
                            <option value="1981">1981</option>
                            <option value="1982">1982</option>
                            <option value="1983">1983</option>
                            <option value="1984">1984</option>
                            <option value="1985">1985</option>
                            <option value="1986">1986</option>
                            <option value="1987">1987</option>
                            <option value="1988">1988</option>
                            <option value="1989">1989</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                        </select>
                    </div>
                    <label className="signup-label" htmlFor="education">
                        EDUCATION
                    </label>
                    <input
                        defaultValue={this.props.fieldValues.education}
                        name="education"
                        type="text"
                        className="form-input"
                    />
                    <label className="signup-label" htmlFor="religion">
                        RELIGION
                    </label>
                    <input
                        defaultValue={this.props.fieldValues.religion}
                        name="religion"
                        type="text"
                        className="form-input"
                    />
                    <label className="signup-label" htmlFor="occupation">
                        OCCUPATION
                    </label>
                    <input
                        defaultValue={this.props.fieldValues.occupation}
                        name="occupation"
                        type="text"
                        className="form-input"
                    />
                    <label className="signup-label" htmlFor="location">
                        LOCATION
                    </label>
                    <input
                        defaultValue={this.props.fieldValues.location}
                        name="location"
                        type="text"
                        className="form-input"
                    />
                </form>
            </div>
        );
    }

}

export default SignUp1;

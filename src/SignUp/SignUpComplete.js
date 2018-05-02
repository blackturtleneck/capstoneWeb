import React from 'react';
import './SignUp.css';

class SignUpComplete extends React.Component {
    render() {
        return (
            <div className="signup-page">
                <div className="complete">REGISTRATION COMPLETE!</div>

                <div className="start-matching">TIME TO START MATCHING</div>
                <div className="complete-button">
                    <button
                        className="button"
                        type="button"
                        onClick={this.props.nextStep}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

export default SignUpComplete;

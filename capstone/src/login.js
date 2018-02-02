class Login extends React.Component {

    render() {
        return (   
            <div className="col-sm-6">         
            <form id="login-form" onSubmit={(e) => this.login(e)}>
                <legend id="login-legend">Login</legend>

                <ul className="list-unstyled">
                    <li className="form-group">
                        <input 
                            type="email" 
                            id="login-email" 
                            className="form-control" placeholder="Email Address"
                            ref="email"/>
                    </li>

                    <li className="form-group">
                        <input 
                            type="password"
                            id="login-password" 
                            className="form-control" 
                            placeholder="Password"
                            ref="password" />
                    </li>

                    <li className="form-group">
                        <button
                            id="login-button"
                            type="submit"
                            className="btn btn-success btn-lg">Login</button>
                    </li>
                </ul>
            </form>
            <div id="signup-error" className="alert alert-danger" role="alert" ref="login"></div>
            </div>
        );
    }

    login(e) {
        e.preventDefault();
        var loginError = this.refs.login;
        var email = this.refs.email.value;
        var password = this.refs.password.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
        })
        .catch(function (error) {
            console.log(error);
            loginError.textContent = error.message;
            loginError.classList.add('active');
        });
    }

}
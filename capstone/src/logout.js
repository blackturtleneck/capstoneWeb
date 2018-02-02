class Logout extends React.Component {

    componentDidMount() {
         firebase.auth().onAuthStateChanged(function(user) {
             if (!user) {
                 window.location.href = "index.html";
             } 
         });
     }
     
     render() {
         return (  
             <button id="logout-button" className="btn btn-primary btn-lg" onClick={(e) => this.logout(e)}>Logout</button> 
         );
     }
 
     logout(e) {
         e.preventDefault();
         firebase.auth().signOut();
     }
 }
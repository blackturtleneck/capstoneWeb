import React, {Component} from 'react';
import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';
import UserListComponent from './UserListComponent';


class UserList extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.chooseUser);
        this.state = {

        }
    }

    chooseUser = (curOtherUser) =>{
        this.props.chooseUser(curOtherUser);
    }


      render(){

          return(
              <div>
              <h1>Matches</h1>
              {
                  this.props.curUserList.map((item, index) => {
                     return <UserListComponent chooseUser={this.chooseUser.bind(this)} user={this.props.user}name={item.name} email={item.email}/>
                  })
              }

                  </div>
          )
      }
}

export default UserList;
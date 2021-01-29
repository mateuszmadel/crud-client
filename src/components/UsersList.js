import React, { Component } from "react";
import UserDataService from "../services/UserDataService";
import MyModal from "./MyModal";
import DataTable from './DataTable'
export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.searchUser = this.searchUser.bind(this);

        this.state = {
            users: [],
            fetchedData:[],
            currentUser: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.getUsers();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        },()=>{
            if(this.state.searchName===''){
                this.setState({
                    users:this.state.fetchedData
                })
            }
            else{
                this.searchUser()
            }
        });
    }

    getUsers() {
       UserDataService.getAll()
            .then(response => {
                this.setState({
                    fetchedData:response.data,
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }



    deleteItem = id => {
        UserDataService.delete(id);
        let arr = this.state.fetchedData.filter(item => item.id_klienta !== id)
        console.log(arr);
        this.setState({
            fetchedData:arr,
            users:arr
        })
    }
    searchUser() {
        let obj = this.state.fetchedData.filter(el=>{
            if(el.imie.toLowerCase().search(this.state.searchName.toLowerCase())>=0 ||el.nazwisko.toLowerCase().search(this.state.searchName.toLowerCase())>=0)
                return el
        })
        console.log(obj)
        this.setState({users:obj})
    }

    render() {
        const { searchName, users } = this.state;

        return (
            <div className="list row">
                <div className="col-md-10">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Wyszukaj po imieniu/nazwisku"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />

                        <MyModal buttonLabel="Dodaj klienta" addItemToState={this.getUsers}/>
                    </div>
                </div>
                <div className="col-md-16">
                    <h4>Lista klientów</h4>
                    <DataTable items={users} deleteItem={this.deleteItem} addItemToState={this.getUsers} />
                </div>

            </div>
        );
    }
}

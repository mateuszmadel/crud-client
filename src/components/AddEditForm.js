import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UserDataService from "../services/UserDataService";
class AddEditForm extends React.Component {
    state = {
        id_klienta: 0,
        id_adresu:0,
        imie: '',
        nazwisko: '',
        pesel: '',
        telefon: '',
        login:'',
        haslo:'',
        email:'',

    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitFormAdd = e => {
        e.preventDefault()
        UserDataService.create(
            JSON.stringify({
                login:this.state.login,
                haslo:this.state.haslo,
                email:this.state.email,
                id_adresu: this.state.id_adresu,
                imie: this.state.imie,
                nazwisko: this.state.nazwisko,
                pesel: this.state.pesel,
                telefon: this.state.telefon
            })
        ).then(response => {
            console.log(response)
            this.props.addItemToState()
            this.props.toggle()
        }
            )
            .catch(err => console.log(err))
        }


    submitFormEdit = e => {
        e.preventDefault()

        UserDataService.update(this.state.id_klienta,
            JSON.stringify({
                id_adresu: this.state.id_adresu,
                imie: this.state.imie,
                nazwisko: this.state.nazwisko,
                pesel: this.state.pesel,
                telefon: this.state.telefon
            })
        ).then(response => {
                console.log(response)
                this.props.addItemToState()
                this.props.toggle()
            }
        )
            .catch(err => console.log(err))
    }


    componentDidMount(){
        if(this.props.item){
            const {id_klienta, id_adresu, id_uzytkownika, imie, nazwisko, pesel, telefon } = this.props.item
            this.setState({ id_klienta, id_adresu, id_uzytkownika, imie, nazwisko, pesel, telefon})
        }
    }

    render() {
        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                {!this.props.item
                    ? <><FormGroup>
                        <Label for="login">Login</Label>
                        <Input type="text" name="login" id="login" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                        <Label for="haslo">Hasło</Label>
                        <Input type="password" name="haslo" id="haslo" onChange={this.onChange}  />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" onChange={this.onChange}  />
                    </FormGroup>

                    </>

                    : null
                }
                <FormGroup>
                    <Label for="id_adresu">Id Adresu</Label>
                    <Input type="number" name="id_adresu" id="id_adresu" onChange={this.onChange} value={this.state.id_adresu === 0 ? '' : this.state.id_adresu} />
                </FormGroup>
                <FormGroup>
                    <Label for="imie">Imie</Label>
                    <Input type="text" name="imie" id="imie" onChange={this.onChange} value={this.state.imie === null ? '' : this.state.imie}  />
                </FormGroup>
                <FormGroup>
                    <Label for="nazwisko">Nazwisko</Label>
                    <Input type="text" name="nazwisko" id="nazwisko" onChange={this.onChange} value={this.state.nazwisko === null ? '' : this.state.nazwisko} />
                </FormGroup>
                <FormGroup>
                    <Label for="pesel">Pesel</Label>
                    <Input type="text" name="pesel" id="pesel" onChange={this.onChange} value={this.state.pesel === null ? '' : this.state.pesel} />
                </FormGroup>
                <FormGroup>
                    <Label for="telefon">Telefon</Label>
                    <Input type="text" name="telefon" id="telefon" onChange={this.onChange} value={this.state.telefon}  />
                </FormGroup>
                <Button>Zatwierdź</Button>
            </Form>
        );
    }
}

export default AddEditForm
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import MyModal from './MyModal'
class DataTable extends Component {
    render() {

        const items = this.props.items.map(item => {
            return (
                <tr key={item.id}>
                    <th scope="row">{item.id_klienta}</th>
                    <td>{item.id_adresu}</td>
                    <td>{item.id_uzytkownika}</td>
                    <td>{item.imie}</td>
                    <td>{item.nazwisko}</td>
                    <td>{item.pesel}</td>
                    <td>{item.telefon}</td>
                    <td>
                       <div style={{width:"110px"}}>
                           <MyModal buttonLabel="Edytuj" item={item} addItemToState={this.props.addItemToState}/>

                            <Button color="danger" onClick={() => this.props.deleteItem(item.id_klienta)}>Usuń</Button>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>ID Klienta </th>
                    <th>ID Adresu</th>
                    <th>ID Uzytkownika</th>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Pesel</th>
                    <th>Telefon</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </Table>
        )
    }
}

export default DataTable

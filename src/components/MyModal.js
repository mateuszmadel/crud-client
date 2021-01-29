import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from "./AddEditForm";
class MyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

        const label = this.props.buttonLabel

        let button = ''
        let title = ''

        if(label === 'Edytuj'){
            button = <Button
                color="warning"
                onClick={this.toggle}
                style={{float: "left", marginRight:"10px"}}>{label}
            </Button>
            title = 'Edytuj dane'
        } else {
            button = <Button
                color="success"
                onClick={this.toggle}
                style={{float: "left",marginLeft:"150px", marginRight:"10px"}}>{label}
            </Button>
            title = 'Dodaj klienta'
        }


        return (
            <div>
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
                    <ModalBody>
                        <AddEditForm
                            addItemToState={this.props.addItemToState}
                            updateState={this.props.updateState}
                            toggle={this.toggle}
                            item={this.props.item} />
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MyModal

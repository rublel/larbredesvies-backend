/*
  component : DeleteCustomerModal
  description : renders a modal to delete a customer
  props : 
    - customer : customer to delete
    -isEdit : boolean to know if the modal trigger is to show or to hide

  Components  :
    -Modal
    -Button
    -Row
    -Table
    -CustomerRow

  States :
    -deletecustomer

  Functions :
  
  hooks :
    -useDispatch : dispatch action to store
    -useState : to manage the modal state


    
*/

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import CustomerRow from "./customerRow/CustomerRow";

//store
import { CustomerTypes, customerActionCreators } from "../../state";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

//style & assets
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteCustomerModal = (props: {
  customer: CustomerTypes.Customer;
  isEditing: boolean;
}) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const { deletecustomer } = bindActionCreators(
    customerActionCreators,
    dispatch
  );
  return (
    <>
      <Button
        variant="outline-danger"
        className={`col-auto ${props.isEditing ? "d-none" : ""}`}
        onClick={() => setModalShow(true)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Modal
        show={modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-danger text-white">
          <Modal.Title id="contained-modal-title-vcenter modal-header-danger">
            voulez-vous vraiment suprimer ce client ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                {[
                  ["Id", "id"],
                  ["Nom", "name"],
                  ["Siret", "siret"],
                  ["Téléphone", "tel"],
                  ["Email", "email"],
                  ["Mot de passe", "password"],

                  ["Address", "address"],
                  ["Code postal", "cp"],
                  ["Solde", "solde_init"],
                ].map((key) => {
                  return <th key={key[1]}>{key[0]}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <CustomerRow whithAction={false} customer={props.customer} />
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deletecustomer(props.customer.id);
              setModalShow(false);
            }}
          >
            confirmer
          </Button>
          <Button onClick={(e) => setModalShow(false)}>Annuler</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCustomerModal;

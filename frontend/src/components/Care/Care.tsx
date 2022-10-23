/*
  component : Customer
  description : Render customer table
  props :

  Components  :
    -Button,
    -Col,
    -Container,
    -Row,
    -Table,
    -Form,
    Dropdown,
    -CustomerRow
    -PageSelector
    -CreateCustomerModal

  States :
    - customers : array of customers
  Functions :
    - getCustomers : get customers from store
  hooks :
    - useSelector : get customers from store
    - useDispatch : dispatch action to store



    
*/

//components
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Table,
  Form,
  Dropdown,
} from "react-bootstrap";
import CustomerRow from "./customerRow/CustomerRow";
import PageSelector from "./PageSelector";
import CreateCustomerModal from "./CreateCustomerModal";
// store
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { State, CustomerTypes, customerActionCreators } from "../../state";
//components

//style & assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const CareMain = () => {
  const numberPerPageArrSelector = [10, 20, 50, 100];
  const { customers, total: nbCustomer } = useSelector(
    (state: State) => state.customer
  );
  const [nbCustomersPerPage, setnbCustomersPerPage] = useState(
    numberPerPageArrSelector[0]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isascending, setIsascending] = useState<"ASC" | "DESC">("ASC");
  const [sortBy, setSortBy] = useState<keyof CustomerTypes.Customer>("id");

  const dispatch = useDispatch();

  const { filterCustomers, getcustomers } = bindActionCreators(
    customerActionCreators,
    dispatch
  );
  const bottomRef = useRef(null);

  //eslint-disable-next-line
  const [scroll, setScroll] = useState(false);
  const fetchCustomers = () => {
    getcustomers({
      sortBy,
      isAsc: isascending,
      perPage: nbCustomersPerPage,
      page: currentPage,
    });
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, [currentPage, isascending, sortBy]);

  return (
    <>
      <Container fluid className="mt-3">
        <Row className="justify-content-between">
          <Col as="h1" xs="auto">
            Clients
          </Col>

          <Col xs="auto">
            <CreateCustomerModal
              currentPage={setCurrentPage}
              isascending={setIsascending}
              sortBy={setSortBy}
            />
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Dropdown className="col-2">
            <Dropdown.Toggle variant="primary">
              {nbCustomersPerPage}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {numberPerPageArrSelector.map((nb) => (
                <Dropdown.Item
                  key={nb}
                  onClick={() => {
                    setnbCustomersPerPage(nb);
                    setCurrentPage(1);
                  }}
                >
                  {nb}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Col xs={5}>
            <Form.Control
              type="text"
              placeholder="Search"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                event?.target?.value === ""
                  ? fetchCustomers()
                  : filterCustomers({
                      text: event.target.value as string,
                      page: 1,
                      perPage: nbCustomersPerPage,
                      sortBy,
                      isAsc: isascending,
                    });
              }}
            />
            <span className="text-black-50">
              {`${nbCustomer} résultats trouvés`}
            </span>
          </Col>
          <PageSelector
            nbCustomersPerPage={nbCustomersPerPage}
            currentPage={currentPage}
            nbCustomer={nbCustomer}
            setCurrentPage={setCurrentPage}
          />
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              {[
                ["Id", "id", "3%"],
                ["Nom", "name", "10%"],
                ["Siret", "siret", "5%"],
                ["Téléphone", "tel", "10%"],
                ["Email", "email", "10%"],
                ["Address", "address", "10%"],
                ["Code postal", "cp", "9%"],
                ["Solde", "solde_init", "9%"],
              ].map(([text, key]) => {
                return (
                  <th
                    key={key}
                    onClick={() => {
                      setIsascending(
                        sortBy === key && isascending === "ASC" ? "DESC" : "ASC"
                      );

                      setSortBy(key as keyof CustomerTypes.Customer);
                      setCurrentPage(1);
                    }}
                  >
                    <Row className="justify-content-center">
                      <Col className="px-1" xs="auto">
                        {text}
                      </Col>
                      <div className="d-flex flex-column col-auto px-1">
                        <FontAwesomeIcon
                          color={
                            sortBy !== key || isascending === "DESC"
                              ? "#6c757d"
                              : "black"
                          }
                          icon={faCaretUp}
                        />

                        <FontAwesomeIcon
                          color={
                            sortBy !== key || isascending === "ASC"
                              ? "#6c757d"
                              : "black"
                          }
                          icon={faCaretDown}
                        />
                      </div>
                    </Row>
                  </th>
                );
              })}
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0
              ? customers.map((customer: CustomerTypes.Customer) => (
                  <CustomerRow
                    type="edit"
                    key={customer.id}
                    customer={customer}
                    tdOrder={[
                      "name",
                      "siret",
                      "tel",
                      "email",
                      "address",
                      "cp",
                      "solde_init",
                    ]}
                  />
                ))
              : Array(nbCustomersPerPage)
                  .fill(
                    new CustomerTypes.CustomerSclass(
                      0,
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      "",
                      0
                    )
                  )
                  .map(
                    (customer: CustomerTypes.CustomerSclass, index: number) => (
                      <CustomerRow
                        type="create"
                        key={index}
                        customer={customer}
                        placeholder={true}
                      />
                    )
                  )}
          </tbody>
        </Table>
        <div ref={bottomRef} />
        <Row className="justify-content-between">
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle variant="primary">
                {nbCustomersPerPage}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(10)}
                  as={Button}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(50)}
                  as={Button}
                >
                  50
                </Dropdown.Item>
                <Dropdown.Item
                  variant="outline-secondary"
                  onClick={() => setnbCustomersPerPage(100)}
                  as={Button}
                >
                  100
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <PageSelector
            nbCustomersPerPage={nbCustomersPerPage}
            currentPage={currentPage}
            nbCustomer={nbCustomer}
            setCurrentPage={setCurrentPage}
          />
        </Row>
      </Container>
    </>
  );
};
export default CareMain;

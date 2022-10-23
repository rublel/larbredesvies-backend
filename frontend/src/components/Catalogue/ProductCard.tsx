/*
  component : ProductModal
  description : ProductCard component
  props : CatalogTypes.Product
  state : None
  components : ProductModal
  functions : None
*/

import React from "react";

//store
import { CatalogTypes, State } from "../../state";

//Components
import Card from "react-bootstrap/Card";
import ProductModal from "./ProductModal";

//styles & assets
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProductCard = ({
  name,
  category,
  price,
  reference,
  commandNumber,
  id,
}: CatalogTypes.Product) => {
  const { categories } = useSelector((state: State) => state.catalogue);
  return (
    <Col xs={12} s={12} md={6} lg={4} xl={3} className=" mb-2">
      <Card>
        <Card.Header className="d-flex justify-content-between">
          {isNaN(id) ? (
            <Placeholder as="h5" className="col-7" animation="glow">
              <Placeholder as="p" xs={12} className="h-100 m-0" />
            </Placeholder>
          ) : (
            <h5 className="col-auto">{reference}</h5>
          )}

          <div className="row col-4 justify-content-between">
            {isNaN(id) ? (
              <>
                <Placeholder className="col-5" animation="glow">
                  <Placeholder as="p" xs={12} className="col m-0" />
                </Placeholder>
                <Placeholder className="col-5" animation="glow">
                  <Placeholder as="p" xs={12} className="col m-0" />
                </Placeholder>
              </>
            ) : (
              <>
                <ProductModal
                  btnClasName="col-auto"
                  btnVariant="outline-warning"
                  btncontent=""
                  btnLogo={faPen}
                  prodId={id}
                  type="update"
                />
                <ProductModal
                  btnClasName="col-auto"
                  btnVariant="outline-danger"
                  btncontent=""
                  btnLogo={faTrash}
                  prodId={id}
                  type="delete"
                />
              </>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          {isNaN(id) ? (
            <>
              <Placeholder animation="glow">
                <Placeholder as="div" xs={12} className="card-title h5" />
              </Placeholder>
              <Placeholder animation="glow">
                <Placeholder
                  as="div"
                  xs={12}
                  className="mb-2 mt-0 card-subtitle h6"
                />
              </Placeholder>
              <Placeholder animation="glow">
                <Placeholder as="p" xs={12} className="card-text" />
              </Placeholder>
            </>
          ) : (
            <>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="mb-2 mt-0">
                {categories.find(({ id }) => id === category)?.name}
              </Card.Subtitle>
              <Card.Text>{price} €</Card.Text>
            </>
          )}
        </Card.Body>
        {isNaN(id) ? (
          <Placeholder as="div" className="card-footer" animation="glow">
            <Placeholder as="p" xs={12} className="h-100 m-0" />
          </Placeholder>
        ) : (
          <Card.Footer className="text-muted">
            {commandNumber} commandes pour ce produit
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

export default ProductCard;

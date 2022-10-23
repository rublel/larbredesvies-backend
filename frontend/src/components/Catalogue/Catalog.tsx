/*
  component: Catalog
  description: Catalog component
  props:
    - items: empty
  State:
    - products: {(CatalogTypes.Product | undefined)[]}

  Components: 
    - ProductCard
    - CategorieSelector
    - ProductModal
  
  Functions: filterProducts 
  hooks: 
    - useSelector 
    -useDispatch 
    -bindActionCreators


  Actions:
    - filterProducts


*/

import React, { useEffect } from "react";
// store
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { catalogueActionCreators, State, CatalogTypes } from "../../state";

//components
import { Col, Container, Form, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import CategorieSelector from "./CategorieSelector";
import ProductModal from "./ProductModal";

// styles & assets
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./prodRow.module.css";

const Catalogue = () => {
  const dispatch = useDispatch();

  const { filterProducts, getCategories, getProducts } = bindActionCreators(
    catalogueActionCreators,
    dispatch
  );
  const products = useSelector((state: State) => state.catalogue.products);
  useEffect(() => {
    getCategories();
    getProducts();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Container fluid className="mt-3">
        <h1>Catalogue</h1>
        <Row>
          <Col md={{ span: 4, offset: 4 }} className="mb-3">
            <Form.Control
              type="text"
              placeholder="produits...."
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                filterProducts(event?.target?.value);
              }}
            />
            <span className="text-black-50">
              {`${products.length} résultats trouvés`}
            </span>
          </Col>
          <Col md={"auto"} className="mb-3 align ms-auto">
            {products.length > 0 && (
              <ProductModal
                btnVariant="primary"
                btncontent="Ajouter un produit"
                btnLogo={faPlus}
                type="create"
              />
            )}
          </Col>
        </Row>
        <Row>
          {/* filter product by categories */}
          <Col className="d-flex flex-column " sm={2} id="catContainer">
            <CategorieSelector />
          </Col>
          <Col sm={10}>
            <Row id="prodRow">
              {products.length
                ? products.map((product, prodKey: number) => (
                    <ProductCard key={prodKey} {...product} />
                  ))
                : [
                    ...Array(20).map(
                      (key) =>
                        new CatalogTypes.ProductClass(
                          NaN,
                          "",
                          NaN,
                          NaN,
                          "",
                          NaN
                        )
                    ),
                  ].map((_, key) => <ProductCard key={key} {..._} />)}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Catalogue;

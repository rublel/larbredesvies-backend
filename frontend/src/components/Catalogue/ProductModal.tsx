/*
  component : productModal
  description : productModal component that displays a modal with a form to create | update | delete a product
  props :
    - btnVariant : string
    - btncontent : string
    - btnLogo : string
    - btnClasName : string
    - prodId : string
  Components  :
    - ProductForm
  States :
    - products : Product[]

  Functions :

  hooks :
    - useSelector
    - useDispatch
    - bindActionCreators

    
*/

import React, { useEffect, useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { State, CatalogTypes, catalogueActionCreators } from "../../state";
//components
import { Button, Modal } from "react-bootstrap";
import ProductForm from "./productForm/ProductForm";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";

//style
import "./prodRow.module.css";

interface FormCreateProdPropsWithId {
  btnVariant: string;
  btncontent: any;
  btnLogo: IconDefinition;
  btnClasName?: string;
  prodId: number;
  type: "update" | "delete";
}

interface FormUpdateProdPropswithoutId {
  btnVariant: string;
  btncontent: any;
  btnLogo: IconDefinition;
  btnClasName?: string;
  prodId?: number;
  type: "create";
}

type productModalProps =
  | FormCreateProdPropsWithId
  | FormUpdateProdPropswithoutId;

const ProductModal = (props: productModalProps) => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { setHasNoError } = bindActionCreators(
    catalogueActionCreators,
    dispatch
  );

  const { products, hasError } = useSelector((state: State) => state.catalogue);
  const [product, setProduit] = useState(
    products.find(
      (product: CatalogTypes.Product) => product.id === props.prodId
    )
  );

  const handleClose = () => {
    setShow(false);
    setHasNoError();
  };
  const handleShow = () => {
    setProduit(
      products.find(
        (product: CatalogTypes.Product) => product.id === props.prodId
      )
    );
    setShow(true);
  };
  useEffect(() => {
    show && !hasError && setShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  const titleaffect = () => {
    switch (props.type) {
      case "create":
        return "Créer un produit";
      case "update":
        return (
          "Modification du produit : " + (product as CatalogTypes.Product).name
        );
      case "delete":
        return (
          "Supprimer le produit : " + (product as CatalogTypes.Product).name
        );
      default:
        return "";
    }
  };

  return (
    <>
      <Button
        className={props.btnClasName}
        variant={props.btnVariant}
        onClick={handleShow}
      >
        {props.btnLogo ? (
          <>
            {props.btncontent} <FontAwesomeIcon icon={props.btnLogo} />
          </>
        ) : (
          props.btncontent
        )}
      </Button>

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titleaffect()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            {...(props.type === "create"
              ? { type: props.type }
              : { type: props.type, id: props.prodId })}
            modalCloser={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          {hasError && <div className="text-danger me-auto">{hasError}</div>}
          <Button variant="secondary" onClick={handleClose}>
            annuler
          </Button>
          <Button
            variant={props.type === "delete" ? "danger" : "primary"}
            form="formCreateProd"
            type="submit"
          >
            {(() => {
              switch (props.type) {
                case "create":
                  return " Créer";
                case "update":
                  return "Modifier ";
                default:
                  return "Supprimer ";
              }
            })()}
            le produit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductModal;

/*
  component : CategorieSelector
  description: CategorieSelector component
  props ß: empty 
  state:
    - categories: {(CatalogTypes.Category | undefined)[]}
  components: None
  functions: setCheckedCategory
  hooks:
    - useSelector
    - useDispatch
    - bindActionCreators
  actions:
    - setCheckedCategory
    

*/

import React, { useEffect, useRef, useState } from "react";

// store
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { catalogueActionCreators, State, CatalogTypes } from "../../state";
//components
import { Button, Form, ListGroup, Row, Placeholder } from "react-bootstrap";

// styles & assets
import styles from "./categorySelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const CategorieSelector = () => {
  const dispatch = useDispatch();
  const { setCheckedCategory, createCategory } = bindActionCreators(
    catalogueActionCreators,
    dispatch
  );
  const { categories, checkedCat, hasError } = useSelector(
    (state: State) => state.catalogue
  );
  const [newCategory, setNewCategory] = useState("");

  const [showPlus, setShowPlus] = useState(true);
  const category = useRef(null);
  const createCategoryEventCback = () => {
    createCategory(newCategory);
  };
  useEffect(() => {
    console.log(showPlus, !hasError);

    !showPlus && !hasError && setShowPlus(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  return (
    <ListGroup as="ul" className={styles.ulHaflheight}>
      {categories.length > 0 && (
        <ListGroup.Item action as="li" className="text-center">
          {showPlus ? (
            <Row
              className={`justify-content-center ${showPlus ? "px-0" : ""}`}
              onClick={() => setShowPlus(!showPlus)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Row>
          ) : (
            <>
              <Row>
                <Form.Control
                  name="category"
                  type="text"
                  placeholder="Nom"
                  onInput={(e) =>
                    setNewCategory((e.target as HTMLInputElement).value)
                  }
                  ref={category}
                />
              </Row>
              <Row className="justify-content-between mt-1">
                <Button
                  className="col-auto"
                  onClick={() => createCategoryEventCback()}
                >
                  Ajouter
                </Button>
                <Button
                  className="col-auto"
                  variant="danger"
                  onClick={() => setShowPlus(!showPlus)}
                >
                  Annuler
                </Button>
              </Row>
            </>
          )}
        </ListGroup.Item>
      )}
      {
        // loop through categories and add a master category to check all
        categories.length > 0
          ? categories.map((category, idcat: number) => (
              // add a checkbox for each category
              <ListGroup.Item
                action
                as="li"
                key={idcat}
                active={category.id === checkedCat}
                value={category.name}
                onClick={() => setCheckedCategory(category.id)}
              >
                {category.name} ({category.count})
              </ListGroup.Item>
            ))
          : [
              ...Array(3).map(
                (_, id) => new CatalogTypes.CategoryClass(NaN, ``, NaN)
              ),
            ].map((_, id) => (
              <Placeholder
                key={id}
                as="li"
                className="list-group-item list-group-item-action"
                animation="glow"
              >
                <Placeholder as="p" xs={12} className="h-100 m-0" />
              </Placeholder>
            ))
      }
    </ListGroup>
  );
};

export default CategorieSelector;

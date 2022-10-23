import { CatalogTypes } from "../../../state";

interface FormCreateProdProps {
  type: "create";
  modalCloser: () => void;
}

interface FormUpdateProdProps {
  type: "update";
  id: CatalogTypes.Product["id"];
  modalCloser: () => void;
}

interface FormDeleteProdProps {
  type: "delete";
  id: CatalogTypes.Product["id"];
  modalCloser: () => void;
}

export type FormProps =
  | FormCreateProdProps
  | FormUpdateProdProps
  | FormDeleteProdProps;

import React from "react";
import { Pagination } from "react-bootstrap";

const PageSelector = ({
  currentPage,
  nbCustomer,
  nbCustomersPerPage,
  setCurrentPage,
}: {
  currentPage: number;
  nbCustomer: number;
  nbCustomersPerPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const disableFirst = currentPage === 1;
  const showpaginnationPrev = currentPage > 2;
  const nbPage = Math.ceil(nbCustomer / nbCustomersPerPage);
  const disableLast = currentPage === nbPage;
  const showPaginnationNext = currentPage < nbPage - 2;

  const setPages = () => {
    let pages = [];
    if (currentPage === 1) {
      pages.push(currentPage);
      while (pages[pages.length - 1] < nbPage && pages.length !== 3) {
        pages.push(pages[pages.length - 1] + 1);
      }
    }

    if (currentPage === nbPage && nbPage > 1) {
      pages.push(currentPage);
      //add -1 to the begining of the array until the first element of the array is one
      while (pages[0] > 1 && pages.length !== 3) {
        pages.unshift(pages[0] - 1);
      }
    }
    if (currentPage > 1 && currentPage < nbPage) {
      pages.push(currentPage);
      pages.unshift(currentPage - 1);
      pages.push(currentPage + 1);
    }
    return pages;
  };

  return (
    <>
      <Pagination className="col-auto">
        <Pagination.First
          disabled={disableFirst}
          onClick={() => {
            setCurrentPage(1);
          }}
        />
        <Pagination.Prev
          className={!showpaginnationPrev ? "d-none" : ""}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        />
        {setPages().map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => {
              console.log(page);
              setCurrentPage(page);
            }}
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Next
          className={!showPaginnationNext ? "d-none" : ""}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
        <Pagination.Last
          disabled={disableLast}
          onClick={() => {
            setCurrentPage(nbPage);
          }}
        />
      </Pagination>
    </>
  );
};
export default PageSelector;

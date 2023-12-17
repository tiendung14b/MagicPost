import React from "react";
import { useEffect } from "react";
import { usePagination } from "../../hooks/usePagination";
import "./Pagination.css";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  useEffect(() => {
    console.log("Current Page:", currentPage);
  }, [currentPage]);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    console.log(currentPage); //not work
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    console.log(currentPage); //not work
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <div className="arrow left"></div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        const isCurrentPage = currentPage === pageNumber;
        if (pageNumber === "...") {
          return (
            <li
              key={index}
              className={`pagination-item dots`}
              onClick={() => {
                console.log("Page number:", pageNumber);
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        }
        return (
          <li
            key={index}
            className={`pagination-item ${isCurrentPage ? "selected" : ""}`}
            onClick={() => {
              console.log("Page number:", pageNumber);
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow right"></div>
      </li>
    </ul>
  );
};

export default Pagination;

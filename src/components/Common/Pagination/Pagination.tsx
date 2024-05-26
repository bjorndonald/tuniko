import React from "react";
import usePagination, { DOTS } from "./usePagination";
import cx from "classnames";

interface Props {
  onPageChange: (num: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  // if (currentPage === 0 || paginationRange!.length < 2) {
  //     return null;
  // }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  // const onPrevious = () => {
  //   onPageChange(currentPage - 1);
  // };

  const lastPage = paginationRange![paginationRange!.length - 1];
  return (
    <div className="hstack join  justify-center gap-8 px-[41px]">
      {/* Left navigation arrow */}
      {/* <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className={` text-lg font-semibold py-3 px-3.5 
                ${currentPage === 1 ? 'text-[#bcbcbc]' : 'text-[#111] dark:text-white'}`}>Prev</button> */}
      <div className="flex gap-3.5">
        {paginationRange!.map((pageNumber: number, index: number) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <button key={index} className="btn btn-ghost bg-transparent">
                ...
              </button>
            );
          }
          // Render our Page Pills
          return (
            <button
              key={index}
              onClick={() => onPageChange(pageNumber)}
              className={cx(
                "btn ",
                currentPage === pageNumber && "btn-primary text-white",
                currentPage !== pageNumber && "btn-outline ",
              )}
            >
              {pageNumber < 10 ? "0" + pageNumber : pageNumber}
            </button>
          );
        })}
      </div>

      {/*  Right Navigation arrow */}
      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className={`btn btn-outline ${currentPage === lastPage ? "btn-disabled" : ""}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

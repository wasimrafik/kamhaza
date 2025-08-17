// "use client";
import React, { useMemo } from "react";
import { Carousel } from "primereact/carousel";

const CustCarousel = ({
  items = [],              // ✅ default to empty array
  numVisible = 3,
  numScroll = 1,
  circular = false,
  page = 0,
  className = "",
  onPageChange,
  ...rest
}) => {
  // Normalize value to always be an array
  const value = useMemo(() => (Array.isArray(items) ? items : []), [items]);

  const itemTemplate = (item, index) => (
    <div className="p-2" key={index}>
      {item}
    </div>
  );

  const handlePageChange = (event) => {
    onPageChange?.(event?.page ?? 0);
  };

  // Optional: clamp page to valid range to avoid out-of-range issues
  const totalPages = value.length > 0 ? Math.ceil(value.length / numScroll) : 1;
  const safePage = Math.min(Math.max(page ?? 0, 0), Math.max(totalPages - 1, 0));

  return (
    <Carousel
      value={value}                           // ✅ always an array
      itemTemplate={itemTemplate}
      numVisible={numVisible}
      numScroll={numScroll}
      circular={circular}
      onPageChange={handlePageChange}
      className={className}
      page={safePage}                         // ✅ clamped page
      {...rest}
    />
  );
};

export default CustCarousel;

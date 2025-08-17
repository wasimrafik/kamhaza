"use client";
import { Carousel } from 'primereact/carousel';

const CustCarousel = ({
  items,
  numVisible = 3,
  numScroll = 1,
  circular = false,
  page = 0,
  className = '',
  onPageChange,
  ...rest
}) => {
  const itemTemplate = (item) => <>{item}</>;

  const handlePageChange = (event) => {
    onPageChange?.(event.page);
  };

  return (
    <Carousel
      value={items}
      itemTemplate={itemTemplate}
      numVisible={numVisible}
      numScroll={numScroll}
      circular={circular}
      onPageChange={handlePageChange}
      className={` ${className}`}
      page={page}
      {...rest}
    />
  );
};

export default CustCarousel;

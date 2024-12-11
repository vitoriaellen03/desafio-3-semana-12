import React from "react";

interface FilterShopProps {
  showFilterPopup: boolean;
  setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Array<{ id: number; name: string }>;
  filterByCategory: (categoryId: string) => void;
  inputValue: number;
  handleProductsPerPageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  indexOfFirstProduct: number;
  indexOfLastProduct: number;
  productsLength: number;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
}

const FilterShop: React.FC<FilterShopProps> = ({
  showFilterPopup,
  setShowFilterPopup,
  categories,
  filterByCategory,
  inputValue,
  handleProductsPerPageChange,
  sortOrder,
  handleSortChange,
  indexOfFirstProduct,
  indexOfLastProduct,
  productsLength,
  setLayout
}) => {
  return (
    <div className="c-fill-shop cont-conteiner">
      <div className="sec-conteiner">
        <section>
          <div>
            <button onClick={() => setShowFilterPopup(true)}>
              <img src="../../../../../assets/img/filter.svg" alt="Filter Icon" />
              Filter
            </button>
          </div>

          {showFilterPopup && (
            <div className="popup">
              <div className="fill-category">
                <div className="t-fill">
                  <h4>Filter by Category</h4>
                  <button onClick={() => setShowFilterPopup(false)}>
                    <i className='bx bx-x-circle'></i>
                  </button>
                </div>

                <button onClick={() => filterByCategory("")}>All Categories</button>
                {categories.map((category) => (
                  <button key={category.id} onClick={() => filterByCategory(category.id.toString())}>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grids-overv">
            <img
              className="grid"
              src="/assets/img/grid.png"
              alt="Grid Layout"
              onClick={() => setLayout('grid')}
            />
            <img
              className="list"
              src="/assets/img/list.png"
              alt="List Layout"
              onClick={() => setLayout('list')}
            />
          </div>

          <div className="show-prodss">
            <p>
              Showing {indexOfFirstProduct + 1}–{indexOfLastProduct} of {productsLength} results
            </p>
          </div>
        </section>

        <section>
          <div>
            <label>
              Products per Page:
              <input
                type="number"
                value={inputValue}
                onChange={handleProductsPerPageChange}
                min="0"
              />
            </label>
          </div>

          <div>
            <label>
              Sort by Price:
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FilterShop;

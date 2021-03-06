// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

// function App() {
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: ""
    };
  }

  filterAndSortProducts = (size, sort) => {
    let newProducts = data.products;
    if (size !== "")
      newProducts = data.products.filter((product) =>
        product.availableSizes.includes(size)
      );

    if (sort !== "Latest") {
      newProducts = newProducts
        .slice()
        .sort((a, b) =>
          sort === "lowest" ? a.price - b.price : b.price - a.price
        );
    }

    return newProducts;
  };

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.filterAndSortProducts(this.state.size, sort)
    });
  };

  filterProducts = (e) => {
    const size = e.target.value;
    this.setState({
      size: size,
      products: this.filterAndSortProducts(size, this.state.sort)
    });
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
    );
  }
}

export default App;

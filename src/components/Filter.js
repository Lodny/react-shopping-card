import React, { Component } from "react";
import { filterProducts, sortProducts } from "../actions/productActions";
import { connect } from "react-redux";

class Filter extends Component {
  render() {
    console.log("Filter : ", this.props);
    return (
      <>
        {!this.props.products ? (
          <div>Loading...</div>
        ) : (
          <div className="filter">
            <div className="filter-result">{this.props.count} Products</div>
            <div className="filter-sort">
              Order{" "}
              <select
                value={this.props.sort}
                onChange={(e) =>
                  this.props.sortProducts(
                    this.props.filteredItems,
                    e.target.value
                  )
                }
              >
                <option value="latest">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </div>
            <div className="filter-size">
              Filter{" "}
              <select
                value={this.props.size}
                onChange={(e) =>
                  this.props.filterProducts(this.props.products, e.target.value)
                }
              >
                <option value="All">All</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connect(
  (state) => {
    console.log("connect() : ", state);

    return {
      size: state.size,
      sort: state.sort,
      // count: state.products.length
      products: state.products,
      filteredItems: state.filteredItems
    };
  },
  {
    filterProducts,
    sortProducts
  }
)(Filter);

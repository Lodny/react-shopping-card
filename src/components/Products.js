import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount()");
    console.log(this.props.fetchProducts);
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({ product: product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;
    // console.log("??", this.props.products);

    return (
      <div>
        <Fade bottom cascade={true}>
          {!this.props.filteredItems ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.filteredItems.map((product) => {
                return (
                  <li key={product._id}>
                    <div className="product">
                      <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                        <img src={product.image} alt={product.title} />
                        <p>{product.title}</p>
                      </a>
                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button onClick={() => this.props.addToCart(product)} className="button primary">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes
                    {product.availableSizes.map((size) => (
                      <span>
                        {" "}
                        <button className="button">{size}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div>Modal</div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => {
    console.log("Product : connect() ", state);
    return { products: state.products.products, filteredItems: state.products.filteredItems };
  },
  {
    fetchProducts,
    addToCart
  }
)(Products);

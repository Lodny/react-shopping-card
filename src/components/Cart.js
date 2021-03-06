import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCheckOut: false,
      email: "",
      name: "",
      address: ""
    };
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    };
    this.props.createOrder(order);
  };

  handleInupt = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { cartItems } = this.props;
    return (
      <>
        <div>
          {cartItems.length === 0 ? (
            <div className="cart cart-header">Cart is empty!</div>
          ) : (
            <div className="cart cart-header">
              You have {cartItems.length} in the cart{" "}
            </div>
          )}
        </div>
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length > 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <button
                  onClick={() => this.setState({ showCheckOut: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
          )}
          {this.state.showCheckOut && (
            <div className="cart">
              <Fade right cascade>
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        name="email"
                        // type="email"
                        type="text"
                        required
                        onChange={this.handleInupt}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        onChange={this.handleInupt}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        name="address"
                        type="text"
                        required
                        onChange={this.handleInupt}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </Fade>
            </div>
          )}
        </div>
      </>
    );
  }
}

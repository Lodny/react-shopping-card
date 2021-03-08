import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
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
      // _id: this.state._id,
      email: this.state.email,
      name: this.state.name,
      address: this.state.address,
      // createAt: Date.now(),
      total: this.props.cartItems.reduce((total, item) => total + item.price * item.count, 0),
      cartItems: this.props.cartItems
    };
    this.props.createOrder(order);
  };

  handleInupt = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    return (
      <>
        {!cartItems ? (
          <div>Loading...</div>
        ) : (
          <>
            {console.log("-----", cartItems)}
            <div>
              {cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is empty!</div>
              ) : (
                <div className="cart cart-header">You have {cartItems.length} in the cart </div>
              )}

              {order && (
                <Modal isOpen={true} onRequestClose={this.closeModal}>
                  <Zoom>
                    <button className="close-modal" onClick={this.closeModal}>
                      x
                    </button>
                    <div className="order-details">
                      <h3 className="success-message">Your order has been placed.</h3>
                      <h2>Order {order._id}</h2>
                      <ul>
                        <li>
                          <div>Name:</div>
                          <div>{order.name}</div>
                        </li>
                        <li>
                          <div>Email:</div>
                          <div>{order.email}</div>
                        </li>
                        <li>
                          <div>Address:</div>
                          <div>{order.address}</div>
                        </li>
                        <li>
                          <div>Date:</div>
                          <div>{order.createdAt}</div>
                        </li>
                        <li>
                          <div>Total:</div>
                          <div>{formatCurrency(order.total)}</div>
                        </li>
                        <li>
                          <div>Cart Items:</div>
                          <div>
                            {order.cartItems.map((item) => (
                              <div>
                                {item.count} {" x "} {item.title}
                              </div>
                            ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Zoom>
                </Modal>
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
                            <button className="button" onClick={() => this.props.removeFromCart(item)}>
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
                    <div>Total: {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}</div>
                    <button onClick={() => this.setState({ showCheckOut: true })} className="button primary">
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
                          <input name="name" type="text" required onChange={this.handleInupt} />
                        </li>
                        <li>
                          <label>Address</label>
                          <input name="address" type="text" required onChange={this.handleInupt} />
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
        )}
      </>
    );
  }
}

export default connect(
  (state) => {
    console.log("Cart : connect() ", state);
    return { cartItems: state.cart.items, order: state.order.order };
  },
  {
    removeFromCart,
    createOrder,
    clearOrder
  }
)(Cart);

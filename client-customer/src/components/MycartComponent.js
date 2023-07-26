import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';


class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tbody>
          <tr key={item.product._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td class="px-6 py-4">
              {item.product.name}
            </td>
            <td class="px-6 py-4">
              {item.product.category.name}
            </td>
            <td class="px-6 py-4">
              <img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" />
            </td>
            <td class="px-6 py-4">
              {item.product.price}
            </td>
            <td class="px-6 py-4">
              {item.quantity}
            </td>
            <td class="px-6 py-4">
              {item.product.price * item.quantity}
            </td>
            <td class="px-6 py-4">
              <span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span>
            </td>
          </tr>
        </tbody>

      );
    });
    return (
      <div class="relative overflow-x-auto tf">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Image
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Amount
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {mycart}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td colSpan="4" class="px-6 py-4">
            </td>
            <td class="px-6 py-4">Total:
            </td>
            <td class="px-6 py-4">{CartUtil.getTotal(this.context.mycart)}
            </td>
            <td class="px-6 py-4"><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span>
            </td>
          </tr>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Success!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('Failure!');
      }
    });
  }
}
export default withRouter(Mycart);
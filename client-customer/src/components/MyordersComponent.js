import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/Mycontext';


class Myorders extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    if (this.context.token === '') return (<Navigate replace to='/login' />);
    const orders = this.state.orders.map((item) => {
      return (
        <tbody>
          <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => this.trItemClick(item)}>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {new Date(item.cdate).toLocaleString()}
            </th>
            <td class="px-6 py-4">
              {item.customer.name}
            </td>
            <td class="px-6 py-4">
              {item.customer.phone}
            </td>
            <td class="px-6 py-4">
              {item.total}
            </td>
            <td class="px-6 py-4">
              {item.status}
            </td>
          </tr>
        </tbody>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item.product.name}
            </th>
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
          </tr>
        );
      });
    }
    return (
      <div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg oder_list">
          <div className='label_orders'>
            <h2>Order list</h2>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5" />
            </svg>
          </div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Creation date
                </th>
                <th scope="col" class="px-6 py-3">
                  Customer
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            {orders}
          </table>
        </div>

        {this.state.order ?
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg detail_list">
            <div className='label_detailOrder'>
              <h2>Order detail</h2>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                <path d="M10.013 4.175 5.006 7.369l5.007 3.194-5.007 3.193L0 10.545l5.006-3.193L0 4.175 5.006.981l5.007 3.194ZM4.981 15.806l5.006-3.193 5.006 3.193L9.987 19l-5.006-3.194Z" />
                <path d="m10.013 10.545 5.006-3.194-5.006-3.176 4.98-3.194L20 4.175l-5.007 3.194L20 10.562l-5.007 3.194-4.98-3.211Z" />
              </svg>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quality
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              {items}
            </table>
          </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Myorders;
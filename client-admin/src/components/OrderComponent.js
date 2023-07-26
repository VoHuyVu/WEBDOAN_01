import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './order.css'

class Order extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tbody>
          <tr key={item._id} onClick={() => this.trItemClick(item)} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {item._id}
            </th>
            <td class="px-6 py-4">
              {new Date(item.cdate).toLocaleString()}
            </td>
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
            <td class="px-6 py-4">
              {item.status === 'PENDING' ?
                <div><button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2.5 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => this.lnkApproveClick(item._id)}>APPROVE</button><button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => this.lnkCancelClick(item._id)}>CANCEL</button></div>
                : <div />}
            </td>
          </tr>
        </tbody>

      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index + 1}
              </th>
              <td class="px-6 py-4">
                {item.product._id}
              </td>
              <td class="px-6 py-4">
                {item.product.name}
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
            </tr>
          </tbody>
        );
      });
    }
    return (
      <div>

        <table className='label_list'>
          <tr>
            <td><img src='data:image/png;base64,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' width='100px'></img></td>
            <td><h1>ORDER LIST</h1></td>
          </tr>
        </table>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Creation date
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
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
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            {orders}
          </table>
        </div>


        {this.state.order ?
          <div>
            <table className='label_list'>
              <tr>
                <td><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamZs3WB1HUY0OWJzU9sgB-nc4SFwzqb6q0A&usqp=CAU' width='100px'></img></td>
                <td><h1>ORDER DETAIL</h1></td>
              </tr>
            </table>

            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    No.
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Prod.ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Prod.name
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
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default Order;
import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Customer extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            orders: [],
            order: null
        };
    }
    render() {
        const customers = this.state.customers.map((item) => {
            return (
                <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.active}</td>
                    <td>
                        {item.active === 0 ?
                            <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
                            :
                            <span className="link" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}
                    </td>
                </tr>
            );
        });
        const orders = this.state.orders.map((item) => {
            return (
                <tbody class="flex-1 sm:flex-none">
                    <tr key={item._id} class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0" onClick={() => this.trOrderClick(item)}>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{item._id}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item.customer.name}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item.total}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{item.status}</td>
                    </tr>
                </tbody>
            );
        });
        if (this.state.order) {
            var items = this.state.order.items.map((item, index) => {
                return (
                    <tr key={item.product._id} className="datatable">
                        <td>{index + 1}</td>
                        <td>{item.product._id}</td>
                        <td>{item.product.name}</td>
                        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price * item.quantity}</td>
                    </tr>
                );
            });
        }
        return (
            <div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg list-cus">
                    <table className='label_list'>
                        <tr>
                            <td><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9oyOH6UV6GIpUqV0rodmwYKHWX7jFMucPQ&usqp=CAU' width='100px'></img></td>
                            <td><h1>CUSTOMER LIST</h1></td>
                        </tr>
                    </table>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 list-table">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Active
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                            {customers}
                        </thead>
                    </table>
                </div>

                {this.state.orders.length > 0 ?
                    <div class="container">
                        <table className='label_list'>
                            <tr>
                                <td><img src='data:image/png;base64,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' width='100px'></img></td>
                                <td><h1>CUSTOMER DETAIL</h1></td>
                            </tr>
                        </table>
                        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 table-order">
                            <thead class="text-white">
                                <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                                    <th class="p-3 text-left">ID</th>
                                    <th class="p-3 text-left">Customer</th>
                                    <th class="p-3 text-left">Total</th>
                                    <th class="p-3 text-left img-list">Status</th>
                                </tr>
                            </thead>
                            {orders}
                        </table>
                    </div>
                    : <div />}
                {this.state.order ?
                    <div className="align-center">
                        <h2 className="text-center">ORDER DETAIL</h2>
                        <table className="datatable" border="1">
                            <tbody>
                                <tr className="datatable">
                                    <th>No.</th>
                                    <th>Prod.ID</th>
                                    <th>Prod.name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                                {items}
                            </tbody>
                        </table>
                    </div>
                    : <div />}
                
            </div>
        );
    }
    componentDidMount() {
        this.apiGetCustomers();
    }
    // event-handlers
    trCustomerClick(item) {
        this.setState({ orders: [], order: null });
        this.apiGetOrdersByCustID(item._id);
    }
    trOrderClick(item) {
        this.setState({ order: item });
    }
    // apis
    apiGetCustomers() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers', config).then((res) => {
            const result = res.data;
            this.setState({ customers: result });
        });
    }
    apiGetOrdersByCustID(cid) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
            const result = res.data;
            this.setState({ orders: result });
        });
    }
    // event-handlers
    lnkDeactiveClick(item) {
        this.apiPutCustomerDeactive(item._id, item.token);
    }
    // apis
    apiPutCustomerDeactive(id, token) {
        const body = { token: token };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
            const result = res.data;
            if (result) {
                this.apiGetCustomers();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
    // event-handlers
    lnkEmailClick(item) {
        this.apiGetCustomerSendmail(item._id);
    }
    // apis
    apiGetCustomerSendmail(id) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }

}
export default Customer;
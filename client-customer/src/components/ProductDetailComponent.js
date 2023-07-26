import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/Mycontext';


class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="align-center prod_list">
          <div className='label_detailPro'>
            <h2 className="text-center">PRODUCT DETAILS</h2>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706" />
            </svg>
          </div>

          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="418.5px" height="400px" alt="" />
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          ID:
                        </th>
                        <th scope="col" class="px-6 py-3">
                          {prod._id}
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Name:
                        </th>
                        <th scope="col" class="px-6 py-3">
                          {prod.name}
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Price:
                        </th>
                        <th scope="col" class="px-6 py-3">
                          {prod.price}
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Category:
                        </th>
                        <th scope="col" class="px-6 py-3">
                          {prod.category.name}
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Quantity:
                        </th>
                        <th scope="col" class="px-6 py-3">
                          <input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} />
                        </th>
                      </tr>
                      <tr>
                        <th scope="col" class="px-6 py-3">

                        </th>
                        <th scope="col" class="px-6 py-3">
                          <input id='addCart' type="submit" value="ADD TO CART" onClick={(e) => this.btnAdd2CartClick(e)} />
                        </th>
                      </tr>
                    </thead>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }
}
export default withRouter(ProductDetail);
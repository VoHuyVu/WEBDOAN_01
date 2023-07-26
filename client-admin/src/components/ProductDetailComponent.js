import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div className="cate_container">
        <table className='label_list'>
            <tr>
              <td><img src='data:image/png;base64,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' width='100px'></img></td>
              <td><h1>PRODUCT DETAIL</h1></td>
            </tr>
          </table>
        <tbody class="flex-1 sm:flex-none cate-list">
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">ID</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">Name</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">Price</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value }) }} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">Image</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">Category</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><select onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}>{cates}</select></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3"></td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)}>
              </input>

              <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}>
              </input>

              <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)}>
              </input>

            </td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td colSpan="2" class="border-grey-light border hover:bg-gray-100 p-3"><img src={this.state.imgProduct} width="300px" height="300px" alt="" /></td>
          </tr>
        </tbody>
      </div>
    );
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name and price and category and image');
    }
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); // remove "data:image/...;base64,"
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Please input id and name and price and category and image');
    }
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input id');
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}
export default ProductDetail;
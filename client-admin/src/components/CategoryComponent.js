import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => this.trItemClick(item)}>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item._id}
          </th>
          <td class="px-6 py-4">
            {item.name}
          </td>
        </tr>
      );
    });
    return (
      <div className='containerCategory'>
          <table className='label_list'>
            <tr>
              <td><img src='data:image/png;base64,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' width='100px'></img></td>
              <td><h1>CATEGORY LIST</h1></td>
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
                    Name
                  </th>
                </tr>
              </thead>
              {cates}
            </table>
          </div>
 
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
    
      </div>
    );
  }

  updateCategories = (categories) => { // arrow-function
    this.setState({ categories: categories });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default Category;
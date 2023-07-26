import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import './prod.css'

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" onClick={() => this.trItemClick(item)}>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item._id}
          </th>
          <td class="px-6 py-4">
            {item.name}
          </td>
          <td class="px-6 py-4">
            {item.price}
          </td>
          <td class="px-6 py-4">
            {new Date(item.cdate).toLocaleString()}
          </td>
          <td class="px-6 py-4">
            {item.category.name}
          </td>
          <td class="px-6 py-4">
            <img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" />
          </td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (<span key={index}>| <b>{index + 1}</b> |</span>);
      } else {
        return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
      }
    });
    return (
      <div>
       
          <table className='label_list'>
            <tr>
              <td><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAflBMVEX///8AAABHR0dDQ0Pf39/b29uvr6+/v78TExP8/PzS0tIYGBirq6sfHx/X19cEBAR5eXkwMDAODg6lpaU4ODiBgYHt7e339/fJyclSUlLj4+Nra2uVlZWPj4+Hh4dcXFwoKCi4uLhNTU1ycnJhYWFFRUWcnJw0NDQ8PDwjIyNtLLmLAAAHhklEQVR4nO2daYOiOBCGxQuPthVUwFvU1vb//8ElEZWQg0AFYu/U+2lnVpN6qFxVFZlWC4VCoVAoFAqFsqve9nxoL7zj8XjrHM67b9v2VNXMyWkztG1SJe3yHI4zs21TFYU+DzINbFtVQRHP4TixbasqyBWBfNm2qoIQ5NOEIJ+mvwfyHY9Ef60PMhI30LC6i8Q+T2CJLkjvJmmgWXUn1MABb4gmyPdY1kCjSjlEhuiBpBy2SV4cAkO0QF4cdkkyHLwhVxHInP1MhsMmCcORNyQ8ikA2TAMMhz2SHAdryPAg4nAGYaaBHIctEo4ja0go5nCci4LDDomA423I+lfC4TirZ+Q+4jlskKxFHI7j78jYuQ6kHInG7c1yeW5Phf+zcZKOzEz/Z3VXYRTJa5ZjDbFVrWZdIgzIzajZsP5/45HWT10ci2Y5ZKsWWONewyDifQTOYSE/XAeJDY46SOxwmCexxWGapPl5Xg+JTQ6TJHY5EhJBFaSKBpY5Wi1ZBJXad1rO3Shy5/uV8mjvXG1ztPZy4/yLmykaDqON3HsD+9XFrRRjydXZgr0MpW3DdFaCkifVaS36dCAZiaumzebF1aCpplvZ569Cp0zsDy3hI/Zd+Rci4ayXgjcmUR7Oj1TfGIlIfNvLbyAaVwp/EEWiBIoXqr9UtzYCm3ZFXxKmhU82p0l4FljUKf7eSkjS5LWIIO6/NT+LkoVTjdG+Fi9du0zjca1Y0g0to01xM63Wsrid6ay+sabRvTMVboR5BTpnTa1HUkVrcbqWleYe3V+eL6uOdx+o2qwrYpyrXTG4335WF+UWIlK4HrnxfLs/b1btxXGcBStc/iqKHVn+5Ph7Omxm++1XHH2vjW0DYdCL4q/rbrY51HW233dWl/Nyd+27o25g/3CE0lRmaJx+vUl6jXE28ehA3F2Tgdj7SH8mkzUikzUxPD9ZidLJn69DTMfHRZvOsHkcjczNMH0Ng+7I7V93OsunkylAeerPkTWv3ikYrr/JSNnTkXKclE2avOIMaUgskZ+Oxf3VyKIYqHMfhXrfjw10dlOFBrCzl86hRKXDuyl13qhYewhHCHSIk4RYdFCEkks2JTSAjC5F0kpLx6QNeo+G3AoCVa0d0IEF7JBkOAT0FHkK4U9lXN0lspyVrshU39LcW+eqeXhWqXKmJRQFgGVEnOE9QG7ELcDmKie/yi79nGKyoz9ASPm8D22v4ml4CJ2d5AluniBJuDeEevhezSXqOEpDS/ojkhTED2Xp1RKaF9ksdIjwLl8ZdWkGKwUhRnShLVa6OvQF7fUnaWTxBvltKS5H6apfAaTguFqsZBMcOW8QkkoAj9ZbeQ7wEkOOFJssyNnADlvhEtQC2uU5/b3YC+RJBtJvWY4Y2iPZOOhIeoE8xxpMBZl+TvJroppaPBt5g5Ds9g3arkaKPCvomZvuwt/0P94gTk9SUSilchnANrQ7sv89ag4ZkJn4Z5bldCrDAb97eXktURmQcXLEuICbLnPpEXpOpQMg3VEzIGQ/gz+jEqVs+NpCzhLp/c0sCBkW4JNPiSQ9NE9Aw9LnwSoL4qzh0RqT0VCrB+6KhIbPoy4DsoTnhZLWu5og8Pl4yAQfDAgJUYSV0FK6FBE81AU/MrL9vs5qDAg5K8Xg5vXKe/DzkHNvZRY+FiRZcobwW3da1UVwsoNmgd6X51kQ8jCh6UvNNxWI7gCU7IYxlgVhIStL4+URWoVjtU7M8MmBkAQC+ADk+MUuAScI6P4dv/+UAyELATiKput47Q4Zs0tsHuRgIC+kkdKGT0QyfrObXh6ETFT4PCysMlw63gQYWPfYfHUehBxfvkEdTAd3r6O3KQbrkdsntxEu3G2EQpEQLpuj5ECOrZIBKC2cri7n/Xbed2GF0zDIFBI9dSFxnosvORAy3ZWBIlM+7AV1VnyZ0u6NKe2SWcicnnmQAxso1l/QLSFa+6XF9m3+fMuD0LJJWmI3eIlFrm7qYTo0SzwpNuLgQfQrNg/PP24jJGNa76zIKx+X+OmkW+7UtW82BhSAyHLRaU2fjliyyOTnom4cUgTCiayDT6fFL6flonIByCOlQx93/HrchZcoagThRZyWqw+JQO6Cx62hBkEEEoFUFIIY6R1BeCGIkd4RhBeCGOkdQXghiJHeEYQXghjpHUF4IYiR3hGEF4IY6R1BeCGIkd4RhBeCGOkdQXghiJHeEYQXghjpHUF4IYiR3hGEF4IY6R1BeCGIkd4RhBeCGOkdQXghiJHeEYQXghjpHUF4/fMg4HdNUBkEqXqBuRXMD+B3G5gCGV++QG/YGkZL4EsTTIAslpGJq/8wx0BBBoe5wRfNAhwDAjHkClYVHVMZxKwrWCWOKf32iWogtbiCVVnHlAep0xWsSjmmJMitflew0nZMCZDmXMFqGM00HKML0rgrWK2vq4JftOiA2HIFq8QxqldYFYLcZlZdwUrhGCWIv7pWPgnWpaErdowcxPskV7ASOUYM8omuYMU5RvQ7xJn7qa5gxTgmB/L5rmAVvhyTBfkzrmD1cMwT5K+5glXonunLWDYz1/K/+IJCoVAoFAqF+uf1H7mopY03LurmAAAAAElFTkSuQmCC' width='100px'></img></td>
              <td><h1>PRODUCT LIST</h1></td>
            </tr>
          </table>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Creation date
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Image
                </th>
              </tr>
            </thead>
            {prods}

          </table>
      
        <div className="inline" />
        <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
        
      </div>
    );
  }
  updateProducts = (products, noPages) => { // arrow-function
    this.setState({ products: products, noPages: noPages });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;
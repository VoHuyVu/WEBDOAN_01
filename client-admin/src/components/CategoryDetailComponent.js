import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="cate_container">
        <table className='label_list'>
          <tr>
            <td><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAADt7e3x8fGtra2xsbH7+/soKChGRkZbW1vBwcHU1NS6uroYGBgiIiLn5+fg4OD19fVAQEDo6OjPz88cHBx5eXmUlJRqamouLi4ODg4UFBSmpqaIiIigoKDZ2dmLi4uYmJg4ODhiYmJ2dnZSUlJJSUloaGi/v79D0vX+AAAIXUlEQVR4nO2d6WLaOhCFMQazBttgUvYtgeb9n/Am6cKMrG2kUUp75/uZWIMOkrUeiU5HEARBEARBEARBEARBEARBEARBEARB0FPnXV/yuvAIWJAiplY3fr4tM3+2l+/9hTVid7qaPxEiLuev4zyZvuJMyctvVqUxYv4cEjDbJyrJflBuPnNkiPgtOOIhhcBTcHay7KarWPVLRMQVv8BVRHay7KnbClhcoiJeuQXGlOAH61bEa2RE5lIMfwd/8aJEDGtjIN9YFUZnJ8saFPDIELFd88MJb/TuDFHEmFbmF698AustQ36yMYjIUYRZVrEpHKuhR73mmNuomvFqpiR6BhHVSrF9mTaVNeKx6bfKfcem8BUHXvl9d/VZyRD4n6L+5DcQ6+5xMrYeo5ijuG/eCcuBoVLVOKdH74gNLnmuESp+DUmVfwhT3l9E9BoOKPnMkUT7qD4w6tj9PKALq+P0959RUfiX4Afoy+FqarogJrWFnoK0fe1fz8SIsJGaENOagArNMyED4B3WK6QGrMEENYHCETkxGO9pFdLHXs9JFfbdTyvkDoX0TDZJFTbup1UcCunT9SqpwoDGa25VuPFZq8LUm5QKA7rYoVXhgK6w8yQKyYhCO6KQHlEU0hGFdkQhPaIopCMK7YhCekRRSEcU2hGF9IiikI4otCMK6RFFIR1RaEcU0iOKQjqi0I4opEdMqpC8BexSOKMrLLYpFQaEXFoVBuwfLqKyowUopDkxPsnsCun2u2NShXSz3NihkO7cOiRVSG8YXh0Kb+Ts3JIqJH/lJUird5tQrQHQRphC4Yb43oy0CmEu58TcrEFaLk8Ucn21Dds2kD383kxN4J9phm34lYV0XloK+LVlV0L7jv3v9zrVRX8nNF8FPjLA5oNG31u29u0ySsXyClop/I+hb22bYB8otYKb2eEMZbepRzmOVTc+dIwpntxs5fGtFW+qSdh0FodOmbVY3kY2roN2kh6U3/737GqNeFNN1RlfU9rhcdZv4Ki90HwDZC58Alms9dhHGn9EJWgIaSb+hMtaGQ0N3Ukc0EdDNhQzewCq11nzbtPQHBaLYrFxf6aNtjG1cSeyQrOH+0jUtGUxAmMlsgt8r6gj98caGOib9TL8BOI8zVngt8AcnU1TrmIXdqBqRjdj+zJVxyJurjvb11336DXjpR+wekXgOO73fOlPG3dmiskbIeKYcRwjCIIgCML/mUUz9qWpAsdXRXcyGU8mi7TDMx3lgTz4PhFX7fP+Hk7/b3ufdT0uqrAbXC7+6ynHk+4bHH7juzzByl7z4X5cvWZzxc68VHLbpa+wRcyK4tI9Iy/OjnWSQ2KNkTcCORdvex4x0s17P/geJ9CxKzfxW1u8Jnwf4y+oGVqiH9zJf8J3m4lC7v5sJ8Y6VlMWMtTLmLiIX/I2WwBK2hbGhXkh+Add3UcNbOjW0Kba2JXmyR/xDX9fp3gZp+qnnJq6LqzU7eGPdjdbJ/B11+Tv8es6b3a6QQbXnS0ApSH1vY1kvMbpNI+0di+e9mrXOXlWO8ot+zgO94UD//V0ZZTQTlgrVXHd072s9U55bM7d+dfwS9yQ1tNRJWuPT5V794zDlkLprRjvMfsE9RW0HRFU/K3+4oyyPbS9XyWu8T3LowHAppR6nQx0zqgKkasmOzki4Q0F3gYVKKTfrgW6c1Uhmkq4SwWVOO8GMFD4nZwY9DSKQuRh0XeWkQm8AQr972r7RWFSiO5s85s2wFJccnYZcXcMbQ0yYPN48owFR4+cF+3y3zHUwUXo7d6ChoklY6fI79Xv4JfKfxgGB3mME+IkCkFHSalvoG4zWqJSKAQuK9VLZAcUIpe7NI1CsHBHG5+A9QDqfYRmUii8j6WXtHCg9+GrpgkUgpBUkyjoMdiqaQKFYPGQam4CVio2c2IChaAgqPHqu/3s2f20HwkUXiJyeV9xYFt4S6DwHpE+07uPFdjm+vwKwZyaPtK9v4jU4y1G+BWC/p4+RQCJuVbd+BU2MQrjDny6QjIpvB9GiLu/NMFd0OwKH+4c8IOV4ePW0qj3EJwDflyF/35bGnU6HFSAx+0PucY09NzokXGpHfa5xX3yzHb+MIFCcHSNOj8Eux2PPD/kmeOzbQanXaeZ0cL9Les0cK2NtrILVpL5frRL1kvtGNa8wQ4EZc0bnPDnO6ueRiF0evkPTdLvW6TZe7J53kzBQmYlRh5z/5DTxAcU0veWQVlhhcjh4Tc6hTV7lmgPmP7DkZ77+D7b58hly2qnTeXFGNJyjFyoybwY2YmYtrGIoPlpsAOUry/8IMYTBT0zrWLC3uCrLdcV9vEze6KQr4227ED0tRnjqD9ly3xaHXsTN4Q+Efub3d7ErbZsCo2Rf8krUbGx+p588PCXLtTfMd/sjzh6cdSfZFmzuqFVj/Bg35QOld3j4aak0vY0mnth1qteU9V1p66rprdatx9IIHGh+YDtzIbuJ+b1owXDHSebzWzjOETD6vtK6dXPg0/jzBhLMe15i+AfNeesqPFnZmyzOfUuMTOK43vN2KJG34VlzUvld4XRrVRfW8ZOo4i818k1FOq57zBaftbzEj844KuoERfwZNmTe6yXO84fbg4/m84KP8f5LoafIR165aLYmS9quoCDGMoxG86JonoPoieEc8DVSdfBX5RzwEr3zDqAqw5X4p1flz1x4aOavo7uPeRl9PzWnnIkrKjvdMvK+zz+sewGLRcV3cX7p5SlMXlaiQ+B2ml8/dUEyVEkXv90fhJQ4UOc/+IFWbjTSHYE+k+COg2+fahHArao9ONKfwVA4hdegPKl/H4X014o8SfJh/+4wHea836a5qpPQRAEQRAEQRAEQRAEQRAEQRC+nP8ArQ57SE+HYtAAAAAASUVORK5CYII=' width='100px'></img></td>
            <td><h1>CATEGORY DETAIL</h1></td>
          </tr>
        </table>
        <tbody class="flex-1 sm:flex-none cate-list">
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">ID</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input className='input_category' type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">Name</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate"><input className='input_category' type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
          </tr>
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 input-cate">
            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)}>

            </input>
            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full" type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)}>

            </input>
            <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-full" type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)}>

            </input>
          </tr>
        </tbody>
       
      </div>

    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input Name!');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Success!');
        this.apiGetCategories();
      } else {
        alert('Fail!');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Success!');
        this.apiGetCategories();
      } else {
        alert('Fail!');
      }
    });
  }

  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Are you sure?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input ID');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Success!');
        this.apiGetCategories();
      } else {
        alert('Fail!');
      }
    });
  }

}
export default CategoryDetail;
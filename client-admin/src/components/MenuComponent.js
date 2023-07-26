import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (


      <div className='all'>
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="https://flowbite.com" class="flex items-center">
              <img id="menuIcon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbL8-lRjEKJ91vSHhzE-umBcMj4NoKZDC1Kw&usqp=CAU" class="h-8 mr-3" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BookStore</span>
            </a>
            <div class="flex items-center floatLefT_menu">
              <h2>Admin</h2>
              <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
              </button>

            </div>
          </div>
        </nav>
        <nav class="bg-gray-50 dark:bg-gray-700">
          <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center">
              <ul class="flex flex-row font-medium mt-0 mr-6 space-x-6 text-sm">
                <li>
                  <Link to='/admin/home' class="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link to='/admin/category' class="text-gray-900 dark:text-white hover:underline">Category</Link>
                </li>
                <li>
                  <Link to='/admin/product' class="text-gray-900 dark:text-white hover:underline">Product</Link>
                </li>
                <li>
                  <Link to='/admin/order' class="text-gray-900 dark:text-white hover:underline">Order</Link>
                </li>
                <li>
                  <Link to='/admin/customer' class="text-gray-900 dark:text-white hover:underline">Customer</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </div>


    );
  }
  // event-handlers
  lnkLogoutClick() {
    if (window.confirm('Do you want to logout?')) {
      this.context.setToken('')
      this.context.setUsername('');
    }
    ;

  }
}
export default Menu;
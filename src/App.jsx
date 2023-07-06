import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import productsFromServer from './api/products';
import categories from './api/categories';

function filterProducts(products, query, selectedUser) {
  let copyProducts = [...products];
  const normalizedQuery = query.toLowerCase().trim();

  if (query) {
    copyProducts = copyProducts.filter(prod => prod.name
      .toLowerCase()
      .trim()
      .includes(normalizedQuery));
  }

  if (selectedUser !== 'All') {
    copyProducts = copyProducts.filter((prod) => {
      const category = categories.find(cat => cat.id === prod.categoryId);
      const user = usersFromServer.find(own => own.id === category.ownerId);

      return user.name === selectedUser;
    });
  }

  return copyProducts;
}

export const App = () => {
  const [searchField, setSearchField] = useState('');
  const [selectedUser, setSelectedUser] = useState('All');
  const visibleProducts = filterProducts(
    productsFromServer,
    searchField,
    selectedUser,
  );

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={selectedUser === 'All' ? 'is-active' : ''}
                onClick={() => handleUserSelection('All')}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  className={selectedUser === user.name ? 'is-active' : ''}
                  onClick={() => handleUserSelection(user.name)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchField}
                  onChange={event => setSearchField(event.currentTarget.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchField && (
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchField('')}
                  />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a
                data-cy="Category"
                className="button mr-2 my-1"
                href="#/"
              >
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleProducts.map((product) => {
                const category = categories.find(
                  cat => cat.id === product.categoryId,
                );
                const user = usersFromServer.find(
                  own => own.id === category.ownerId,
                );

                let textColor = 'has-text-link';

                if (user.sex === 'f') {
                  textColor = 'has-text-danger';
                }

                return (
                  <tr data-cy="Product">
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {product.id}
                    </td>

                    <td data-cy="ProductName">{product.name}</td>

                    <td data-cy="ProductCategory">
                      {category.icon}
                      {' '}
                      -
                      {' '}
                      {category.title}
                    </td>

                    <td
                      data-cy="ProductUser"
                      className={textColor}
                    >
                      {user.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

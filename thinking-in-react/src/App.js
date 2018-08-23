import React, { Component } from 'react';
import './App.css';

class SearchToolbar extends Component {
    constructor(props) {
        super(props);

        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e) {
        this.props.onSearchChange(e.target.value);
    }

    handleInStockOnlyChange(e) {
        this.props.onInStockOnlyChange(e.target.checked);
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="onlyStocked">Only Stocked</label>
                    <input
                        type="checkbox"
                        name="onlyStocked"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockOnlyChange}
                    />
                </div>
                <div>
                    <label htmlFor="search">Search</label>
                    <input
                        type="text"
                        name="search"
                        value={this.props.filterText}
                        onChange={this.handleSearchChange}
                    />
                </div>
            </div>
        );
    }
}

class ProductRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductCategory extends Component {
    render() {
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        );
    }
}

class ProductTable extends Component {
    render() {
        const rows = [];
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        let lastCategory;

        this.props.products.forEach(product => {
            if (filterText && product.name.indexOf(filterText) === -1) {
                return;
            }

            if (inStockOnly && !product.stocked) {
                return;
            }

            if (product.category !== lastCategory) {
                rows.push(<ProductCategory category={product.category} key={product.category}></ProductCategory>);
                lastCategory = product.category;
            }

            rows.push(<ProductRow product={product} key={product.name}></ProductRow>);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(filterText) {
        this.setState({
            filterText
        });
    }

    handleInStockOnlyChange(inStockOnly) {
        this.setState({
            inStockOnly
        });
    }

    render() {
        return (
            <div>
                <SearchToolbar
                    onSearchChange={this.handleSearchChange}
                    onInStockOnlyChange={this.handleInStockOnlyChange}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />

                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterableProductTable products={PRODUCTS}></FilterableProductTable>
      </div>
    );
  }
}

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

export default App;

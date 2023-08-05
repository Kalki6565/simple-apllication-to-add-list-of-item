import React from 'react';
import axios from 'axios';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'


class MyItemManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            items: [],
            editAction: false,
            editItemId: ''
        };
    }

    componentDidMount = () => {
        this.getData()
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        axios
            .post('http://localhost:5000/api/items', { name: this.state.name, description: this.state.description }) // Replace '/api/items' with your actual API endpoint
            .then((response) => {
                console.log('Item added successfully:', response.data);
                this.setState({ name: '', description: '' })
                this.getData()
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    };

    getData = () => {
        axios
            .get('http://localhost:5000/api/items')
            .then((response) => {
                console.log('Item added successfully:', response.data);
                this.setState({ items: response.data })
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    }

    deleteData = (id) => {
        axios
            .delete(`http://localhost:5000/api/items/${id}`)
            .then((response) => {
                console.log('Item Deleted Successfully', response);
                this.getData()
            })
            .catch((error) => {
                console.error('Error adding item:', error);
                });
    }

    editDataApi = () => {
        axios
            .put(`http://localhost:5000/api/items/${this.state.editItemId}`, { name: this.state.name, description: this.state.description }) // Replace '/api/items' with your actual API endpoint
            .then((response) => {
                console.log('Item Edited successfully:', response.data);
                this.setState({ name: '', description: '' })
                this.getData()
            })
            .catch((error) => {
                console.error('Error adding item:', error);
            });
    }

    editdata = (item) => {
        console.log('item is je', item)
        this.setState({ name: item.name, description: item.description, editAction: true, editItemId: item._id })
    }

    render() {
        const { items } = this.state
        console.log('item is je', items)
        return (
            <div>
                <form style={{ marginLeft: '100px', marginRight: '100px' }}>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-blue-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    style={{ padding: '10px' }}
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-blue-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    style={{ padding: '10px' }}
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        {!this.state.editAction && (
                            <button
                                onClick={() => this.handleSubmit()}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Item
                            </button>
                        )}
                        {this.state.editAction && (
                            <button
                                onClick={() => this.editDataApi()}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Edit Item
                            </button>
                        )}
                    </div>
                </form>
                {items.length > 0 && (
                    <div style={{ marginLeft: '600px', marginRight: '50px', marginTop: '50px' }}>
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-blue-900">List of Items</h2>
                        </div>
                    </div>
                )}
                {items.map((item) => {
                    return (
                        <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                            <div className="mt-6 border-t border-blue-800">
                                <dl className="divide-y divide-blue-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-blue-900">Name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-blue-900 sm:col-span-2 sm:mt-0"> {item.name}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-blue-900">Description</dt>
                                        <dd className="mt-1 text-sm leading-6 text-blue-900 sm:col-span-2 sm:mt-0">
                                            {item.description}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-blue-900">Actions</dt>
                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PencilSquareIcon style={{ cursor: 'pointer' }} className="h-5 w-5 flex-shrink-0 text-blue-400" aria-hidden="true" onClick={() => { this.editdata(item) }} />
                                                <TrashIcon style={{ cursor: 'pointer' }} className="h-5 w-5 flex-shrink-0 text-red-400" aria-hidden="true" onClick={() => { this.deleteData(item._id) }} />
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MyItemManager;


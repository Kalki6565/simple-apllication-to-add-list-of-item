import React from 'react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'



class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { item } = this.props
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
    }
}

export default ItemList;


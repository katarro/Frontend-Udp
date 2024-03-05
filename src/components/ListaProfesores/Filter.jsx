import React from "react";

export default function Filter({ handleSearchChange, handleSortChange }) {
    return (
        <div className="mt-5 mb-5 flex items-center justify-center">
            <div className="flex flex-col">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <form className="">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                            <div className="flex flex-col"> 
                                <label htmlFor="name" className="text-sm font-medium text-stone-600">
                                    Buscador
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Nombre..."
                                    onChange={handleSearchChange}
                                    className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>

                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

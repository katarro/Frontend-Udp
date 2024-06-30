import React from 'react';
import { Link } from 'react-router-dom';
// import './Information.css';
import foto1 from '../media/foto1.jpg';

const CardComponent = ({ to, icon, title, content, content2 }) => {
    return (
        <div>

            <Link to={to}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={to}>  <img className="rounded-t-lg" src={icon} alt="" />   </Link>
                    <div className="p-5">
                        <Link to={to}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {title}
                            </h5>
                        </Link>
                        <p className=" mb-3 font-normal text-gray-700 dark:text-gray-400">{content} </p>
                        <div className='flex justify-end'>

                            <Link to={to}   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#393939] rounded-lg hover:bg-[#2d2d2d] focus:ring-4 focus:outline-none focus:ring-[#5c5c5c] dark:bg-[#393939] dark:hover:bg-[#2d2d2d] dark:focus:ring-[#5c5c5c]"
 >
                                Ver más
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </Link>

        </div>

    );

};

export default CardComponent;

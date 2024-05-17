import React, { useEffect, useState } from 'react'
import driverImg from "../assets/drive.png"
const Home = () => {
    const [data, setData] = useState([]);
    const [driver, setDriver] = useState('left');
    const [firstRowSeats, setFirstRowSeats] = useState(4);
    const [lastRowSeats, setLastRowSeats] = useState('');
    const [seatRow, setSeatRow] = useState(10);
    const [seatColumns, setSeatColumns] = useState(4);
    const [seatGaps, setSeatGaps] = useState(20);
    const [width, setWidth] = useState(500)
    console.log(seatGaps)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('button.json');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [firstRowSeats, seatGaps]);


    return (
        <div className='container mx-auto px-10 h-screen pt-[14vh]'>
            <div className="grid grid-cols-3 gap-10">
                <form className='flex flex-col space-y-4'>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Transport type'
                        // value={transportType}
                        // onChange={(e) => setTransportType(e.target.value)}
                        />
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='First row seats'
                            value={firstRowSeats}
                            onChange={(e) => setFirstRowSeats(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Last row seats'
                            value={lastRowSeats}
                            onChange={(e) => setLastRowSeats(Number(e.target.value))}
                        />
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Seat Row'
                            value={seatRow}
                            onChange={(e) => setSeatRow(Number(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Seat Columns'
                            value={seatColumns}
                            onChange={(e) => setSeatColumns(Number(e.target.value))}
                        />
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Seat Gaps'
                            value={seatGaps}
                            onChange={(e) => setSeatGaps(Number(e.target.value))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            type="text"
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            placeholder='Width'
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                        <select
                            className='bg-gray-200 focus:outline-0 rounded-sm py-3 px-4'
                            onChange={(e) => setDriver(e.target.value)}
                        >
                            <option value="">Select Driver</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="noDriver">No Driver</option>
                        </select>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">Submit</button>
                </form>

                <div className="p-5 border-2 border-gray-300 rounded-sm col-span-2">
                    <div className="flex flex-col" style={{ gap: `${seatGaps}px`, width: `${width}px` }}>
                        <div className="h-14">
                            {
                                driver === 'left' && <img src={driverImg} className=' text-left mr-auto' alt="" />
                            }
                            {
                                driver === 'right' && <img src={driverImg} className=' text-right ml-auto' alt="" />
                            }
                            {
                                driver === 'noDriver' && <img src={driverImg} className=' hidden' alt="" />
                            }
                        </div>
                        {data.slice(0, seatRow * 4).reduce((groups, item, index) => {
                            let groupIndex;
                            if (index < firstRowSeats) {
                                groupIndex = Math.floor(index / firstRowSeats);
                            }
                            else if (index >= seatRow * 4 - 7) {
                                groupIndex = Math.floor((index - (seatRow * 4 - lastRowSeats)) / lastRowSeats) + Math.ceil(seatRow * 4 / seatColumns);
                            }
                            else {
                                groupIndex = Math.floor((index - firstRowSeats) / seatColumns) + 1;
                            }

                            if (!groups[groupIndex]) groups[groupIndex] = [];
                            groups[groupIndex].push(
                                <button
                                    key={item.id}
                                    className="px-6 py-3 w-20 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                >
                                    {item.label}
                                </button>
                            );
                            return groups;
                        }, []).map((group, index) => (
                            <div key={`group-${index}`} className="flex" style={{ gap: `${seatGaps}px` }}>
                                {group}
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home
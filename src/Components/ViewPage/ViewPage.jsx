import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

// Define the useInterval hook
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const ViewPage = () => {
    const queryClient = useQueryClient(); // Initialize queryClient
    const { data: getSource = [] } = useQuery({
        queryKey: ['getSource'],
        queryFn: async () => {
            const res = await axios.get('http://192.168.60.127:8085/get-source-info/');
            return res.data;
        }
    });

    const [sourceData, setSourceData] = useState({});
    const [loading, setLoading] = useState(true);

    // Refresh data every 2 seconds
    useInterval(() => {
        fetchData();
    }, 2000);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const newData = {};
            await Promise.all(getSource.map(async (source) => {
                const { source_name } = source;
                if (source_name) {
                    const res = await axios.get(`http://192.168.60.127:8085/get-source-data/${source_name}/`);
                    newData[source_name] = res.data;
                }
            }));
            setSourceData(newData);
            setLoading(false);
            // Manually invalidate the cache to trigger a refetch
            queryClient.invalidateQueries("getSource");
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const generateAllPositions = () => {
        const maxPosition = Math.max(...getSource.map(source => parseInt(source.position.substring(1))));
        return Array.from({ length: maxPosition + 1 }, (_, index) => `S${index}`);
    };

    const allPositions = generateAllPositions();

    return (
        <div className="mt-5 ml-5">
            <div className="flex overflow-x-auto h-screen gap-5">
                {allPositions.map((position, index) => {
                    const source = getSource.find(source => source.position === position);
                    if (source) {
                        const sourceName = source.source_name;
                        const sourceType = source.source_type;
                        const shape = source.shape;
                        const sourceDataPoints = sourceData[sourceName] || [];
                        const latestDataPoint = sourceDataPoints.reduce((prev, current) => {
                            return (prev.timedate > current.timedate) ? prev : current;
                        }, {});
                        const latestPowerValue = latestDataPoint.power;
                        console.log(latestPowerValue)
                        return (
                            <div key={source.position}>
                                {
                                    (!shape || shape === 'circle') ? (
                                        <div key={index} className="flex-shrink-0 w-[120px] h-[120px] rounded-full border-[3px] flex justify-center items-center border-green-600 relative">
                                            <div className="absolute top-0 right-0 bg-white rounded-full p-1">
                                                {position}
                                            </div>
                                            <div className="text-center">
                                                <h2 className="text-sm font-semibold">{sourceName}</h2>
                                                <h2 className="text-sm">{sourceType}</h2>
                                                <p className="text-xs">{position}</p>
                                                {latestPowerValue !== undefined && (
                                                    <p className="text-xs">Power: {latestPowerValue}</p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="flex-shrink-0 w-[120px] h-[120px] rounded border-[3px] flex justify-center items-center border-green-600 relative">
                                            <div className="absolute top-0 right-0 bg-white rounded-full p-1">
                                                {position}
                                            </div>
                                            <div className="text-center">
                                                <h2 className="text-sm font-semibold">{sourceName}</h2>
                                                <h2 className="text-sm">{sourceType}</h2>
                                                <p className="text-xs">{position}</p>
                                                {latestPowerValue !== undefined && (
                                                    <p className="text-xs">Power: {latestPowerValue}</p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        );
                    } else {
                        return <div key={index} className="flex-shrink-0 w-[120px] h-[120px]" />;
                    }
                })}
            </div>
        </div>
    );
};

export default ViewPage;

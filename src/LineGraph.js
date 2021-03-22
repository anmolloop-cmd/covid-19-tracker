import React from 'react';
import { Line } from 'react-chartjs-2';
import react, { useState, useEffect } from "react";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAsceptRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "li",
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function LineGraph() {
    const [data, setData] = useState({});
    const buildChartData = (data, casesType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date]-lastDataPoint,
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
        }
        return chartData;
    };
    useEffect(() => {

        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(respnse => respnse.json())
            .then(data => {
                const charData = buildChartData(data);
                setData(charData);
            });
    }, []);

    return (
        <div>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204,16,52,0.5)",
                                backgroundColor: "#CC1034",
                                data: data,
                            }
                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph;

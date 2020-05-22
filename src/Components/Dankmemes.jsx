import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios'

const Dankmemes = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([])
     const[employeeAge,setEmployeeAge]=useState([])

    const chart = async () => {
        const empSal = [];
        const empAge = [];
        try {
            const  res  = await axios.get('http://dummy.restapiexample.com/api/v1/employees')
            console.log(res)
            for (const dataObj of res.data.data) {
                empSal.push(parseInt(dataObj.employee_salary))
                empAge.push(parseInt(dataObj.employee_age))
            }
            
        } catch (error) { 
            console.log(error)
        }
        console.log(empSal,empAge)
      setChartData({
        
      labels: empAge,
      datasets: [
        {
          label: "level of thickness",
          data: empSal,
          backgroundColor: ["rgba(75,192,192,0.6)"],
          borderWidth: 4,
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div>
      <h3>Dankmemes</h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          title: { text: "THICKNESS SCALE", display: true },
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  beginAtZero: true,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Dankmemes;


//http://dummy.restapiexample.com/api/v1/employees
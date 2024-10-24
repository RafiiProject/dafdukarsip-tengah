import "./chart.scss";
import { useEffect, useState } from "react";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const CustomChart = ({ type, widgetData }) => {
  const [chartDataKeseluruhanBulanan, setChartDataKeseluruhanBulanan] = useState(null); // Last year (data keseluruhan)
  const [chartDataKeseluruhanHarian, setChartDataKeseluruhanHarian] = useState(null); // Last month (data keseluruhan + rusak)
  const [pieChartData, setPieChartData] = useState(null); // Data for Pie Chart
  const navigate = useNavigate();

  // Labels for last year (months) and last month (days of the month)
  const yearLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthLabels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());  // Last 30 days

  let data = {};

  if (type) {
    switch (type) {
      case "dinas":
        data.query = "dinas";
        break;
      // Add other cases here...
      default:
        console.error("Invalid 'type' passed to Chart component");
        return;
    }
  } else {
    console.error("'type' is undefined");
    return;
  }

  // Fetching the counts from Firestore based on 'type'
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const startDateLastYear = `${year}-01-01`;
      const endDateLastYear = `${year}-12-31`;
      const startDateLastMonth = new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];

      try {
        // Query for last month data (overall)
        const qDailyTotal = query(
          collection(db, data.query), 
          where("tanggal", ">=", startDateLastMonth), 
          orderBy("tanggal", "asc")
        );
        const queryDailySnapshot = await getDocs(qDailyTotal);

        const lastMonthData = new Array(30).fill(0);
        queryDailySnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const dayOfMonth = docDate.getDate() - 1;
          lastMonthData[dayOfMonth]++;
        });

        // Query for last month damaged data
        const qDailyDamaged = query(collection(db, data.query), where("tanggal", ">=", startDateLastMonth), where("keterangan", "==", "RUSAK"));
        const queryDailyDamagedSnapshot = await getDocs(qDailyDamaged);
        const lastMonthDamagedData = new Array(30).fill(0);
        queryDailyDamagedSnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const dayOfMonth = docDate.getDate() - 1;
          lastMonthDamagedData[dayOfMonth]++;
        });

        // Set data for last month (keseluruhan + rusak)
        setChartDataKeseluruhanHarian({
          labels: monthLabels,
          datasets: [
            {
              label: 'Last Month (Data Keseluruhan)',
              data: lastMonthData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Last Month (Data Rusak)',
              data: lastMonthDamagedData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });

        // Query for last year data (overall)
        const qMonthlyTotal = query(collection(db, data.query), where("tanggal", ">=", startDateLastYear));
        const queryMonthlySnapshot = await getDocs(qMonthlyTotal);
        const lastYearData = new Array(12).fill(0);
        queryMonthlySnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const monthOfYear = docDate.getMonth();
          lastYearData[monthOfYear]++;
        });

        // Query for last year damaged data
        const qMonthlyDamaged = query(collection(db, data.query), where("tanggal", ">=", startDateLastYear), where("keterangan", "==", "RUSAK"));
        const queryMonthlyDamagedSnapshot = await getDocs(qMonthlyDamaged);
        const lastYearDamagedData = new Array(12).fill(0);
        queryMonthlyDamagedSnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const monthOfYear = docDate.getMonth();
          lastYearDamagedData[monthOfYear]++;
        });

        // Calculate total data for pie chart
        const totalData = lastYearData.reduce((a, b) => a + b, 0);
        const totalDamagedData = lastYearDamagedData.reduce((a, b) => a + b, 0);

        setPieChartData({
          labels: ['Total Data', 'Total Rusak'],
          datasets: [
            {
              label: 'Total Data',
              data: [totalData, totalDamagedData],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        });

        // Set data for last year overall
        setChartDataKeseluruhanBulanan({
          labels: yearLabels,
          datasets: [
            {
              label: 'Last Year (Data Keseluruhan)',
              data: lastYearData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Last Year (Data Rusak)',
              data: lastYearDamagedData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data.query, widgetData]);

  return (
    <div className="chart-container">
      <h3>Data Statistik ({type.toUpperCase()})</h3>
      <div className="charts">
        {chartDataKeseluruhanHarian && (
          <div className="card chart">
            <h4>Last Month Data Keseluruhan dan Rusak</h4>
            <Line data={chartDataKeseluruhanHarian} options={{ maintainAspectRatio: false }} />
          </div>
        )}
        {chartDataKeseluruhanBulanan && (
          <div className="card chart">
            <h4>Last Year Data Keseluruhan dan Rusak</h4>
            <Line data={chartDataKeseluruhanBulanan} options={{ maintainAspectRatio: false }} />
          </div>
        )}
        {pieChartData && (
          <div className="card chart">
            <h4>Total Data vs Total Rusak</h4>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomChart;

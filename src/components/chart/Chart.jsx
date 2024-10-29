import "./chart.scss";
import { useEffect, useState } from "react";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CustomChart = ({ type, widgetData }) => {
  const [chartDataKeseluruhanBulanan, setChartDataKeseluruhanBulanan] = useState(null); // Last year (data keseluruhan)
  const [chartDataKeseluruhanHarian, setChartDataKeseluruhanHarian] = useState(null); // Last month (data keseluruhan + rusak)
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
      case "tengah":
        data.query = "tengah";
        break;
      case "barat":
        data.query = "barat";
        break;
      case "timur":
        data.query = "timur";
        break;
      case "utara":
        data.query = "utara";
        break;
      case "selatan":
        data.query = "selatan";
        break;
      case "candisari":
        data.query = "candisari";
        break;
      case "tembalang":
        data.query = "tembalang";
        break;
      case "banyumanik":
        data.query = "banyumanik";
        break;
      case "gajahmungkur":
        data.query = "gajahmungkur";
        break;
      case "gunungpati":
        data.query = "gunungpati";
        break;
      case "ngaliyan":
        data.query = "ngaliyan";
        break;
      case "pedurungan":
        data.query = "pedurungan";
        break;
      case "genuk":
        data.query = "genuk";
        break;
      case "mijen":
        data.query = "mijen";
        break;
      case "tugu":
        data.query = "tugu";
        break;
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

      const todayString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      // For Last Year (January to December)
      const startDateLastYear = `${year}-01-01`;
      const endDateLastYear = `${year}-12-31`;

      // For Last Month (past 30 days)
      const startDateLastMonth = new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];

      try {
        // Query for last month data (overall)
        const qDailyTotal = query(
          collection(db, data.query), 
          where("tanggal", ">=", startDateLastMonth), 
          orderBy("tanggal", "asc") // Urutkan berdasarkan tanggal jika dibutuhkan
        );
        const queryDailySnapshot = await getDocs(qDailyTotal);

        // Inisialisasi array untuk menampung data dari Firestore
        const lastMonthData = new Array(30).fill(0); // Pastikan array memiliki 30 slot

        // Menghitung jumlah data yang sesuai dengan tanggal yang ditampilkan di widget
        queryDailySnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const dayOfMonth = docDate.getDate() - 1; // 0-based index untuk hari
          lastMonthData[dayOfMonth]++; // Tambahkan hitungan data untuk hari tersebut
        });

        // Penyesuaian array dengan data widget (asumsikan widget juga menunjukkan data 30 hari terakhir)
        if (widgetData) {
          for (let i = 0; i < widgetData.length; i++) {
            lastMonthData[i] = widgetData[i]; // Sesuaikan data pada chart dengan widget
          }
        }

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
              data: lastMonthData, // Gunakan array yang sudah disesuaikan
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
        const lastYearData = new Array(12).fill(0); // Array for 12 months
        queryMonthlySnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const monthOfYear = docDate.getMonth(); // 0-based index
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
      </div>
    </div>
  );
};

export default CustomChart;

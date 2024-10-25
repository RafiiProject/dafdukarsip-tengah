import "./chartleg.scss";
import { useEffect, useState } from "react";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

// Custom plugin to display value in the center of Pie chart
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;
    const total = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);

    ctx.save();

    // Reset the transform to ensure nothing else affects font size
    ctx.resetTransform();

    // Set the large font size and alignments
    ctx.font = 'bold 80px Arial';  // Sesuaikan ukuran font agar pas di tengah
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#4CAF50';  // Warna font

    // Calculate the center point of the chart
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

    // Draw the text in the center of the pie chart
    ctx.fillText(total, centerX, centerY);

    ctx.restore();
  }
};



const Chartleg = ({ type, widgetData }) => {
  const [chartDataKeseluruhanBulanan, setChartDataKeseluruhanBulanan] = useState(null);
  const [chartDataKeseluruhanHarian, setChartDataKeseluruhanHarian] = useState(null);
  const [pieChartDataMasuk, setPieChartDataMasuk] = useState(null);
  const [pieChartDataRusak, setPieChartDataRusak] = useState(null);
  const navigate = useNavigate();

  const yearLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthLabels = Array.from({ length: 30 }, (_, i) => (i + 1).toString()); 

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

      const startDateLastYear = `${year}-01-01`;
      const endDateLastYear = `${year}-12-31`;

      const startDateLastMonth = new Date(today.setDate(today.getDate() - 30)).toISOString().split('T')[0];

      try {
        // Fetch daily and monthly data
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

        if (widgetData) {
          for (let i = 0; i < widgetData.length; i++) {
            lastMonthData[i] = widgetData[i];
          }
        }

        // Data rusak harian
        const qDailyDamaged = query(collection(db, data.query), where("tanggal", ">=", startDateLastMonth), where("keterangan", "==", "RUSAK"));
        const queryDailyDamagedSnapshot = await getDocs(qDailyDamaged);
        const lastMonthDamagedData = new Array(30).fill(0);
        queryDailyDamagedSnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const dayOfMonth = docDate.getDate() - 1;
          lastMonthDamagedData[dayOfMonth]++;
        });

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

        // Data bulanan
        const qMonthlyTotal = query(collection(db, data.query), where("tanggal", ">=", startDateLastYear));
        const queryMonthlySnapshot = await getDocs(qMonthlyTotal);
        const lastYearData = new Array(12).fill(0);
        queryMonthlySnapshot.forEach((doc) => {
          const docDate = new Date(doc.data().tanggal);
          const monthOfYear = docDate.getMonth();
          lastYearData[monthOfYear]++;
        });

        const qMonthlyDamaged = query(collection(db, data.query), where("tanggal", ">=", startDateLastYear), where("keterangan", "==", "RUSAK"));
        const queryMonthlyDamagedSnapshot = await getDocs(qMonthlyDamaged);
        const lastYearDamagedData = new Array(12).fill(0);
        queryMonthlyDamagedSnapshot.forEach((doc) => {
          const monthOfYear = new Date(doc.data().tanggal).getMonth();
          lastYearDamagedData[monthOfYear]++;
        });

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

        // Data untuk pie chart
        const totalMasuk = lastYearData.reduce((a, b) => a + b, 0);
        const totalRusak = lastYearDamagedData.reduce((a, b) => a + b, 0);

        setPieChartDataMasuk({
          labels: ['Total Masuk'],
          datasets: [{
            data: [totalMasuk],
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx } = chart;
              const gradient = ctx.createLinearGradient(0, 0, 0, 200);
              gradient.addColorStop(0, '#42A5F5');
              gradient.addColorStop(1, '#1E88E5');
              return gradient;
            },
            hoverBackgroundColor: '#42A5F5',
            cutout: '70%', // Menambahkan cutout agar pie chart berbentuk donut
            hoverOffset: 50,  // Creates a hover animation by offsetting the arc
          }]
        });
        
        setPieChartDataRusak({
          labels: ['Total Rusak'],
          datasets: [{
            data: [totalRusak],
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx } = chart;
              const gradient = ctx.createLinearGradient(0, 0, 0, 200);
              gradient.addColorStop(0, '#FF7043');
              gradient.addColorStop(1, '#F4511E');
              return gradient;
            },
            hoverBackgroundColor: '#FF7043',
            cutout: '70%', // Menambahkan cutout agar pie chart berbentuk donut
            hoverOffset: 50,  // Creates a hover animation by offsetting the arc
          }]
        });        
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };
    fetchData();
  }, [data.query, widgetData]);

  return (
    <div className="charts-container">
      <div className="line-charts">
        <div className="chart-card">
          {chartDataKeseluruhanBulanan && <Line data={chartDataKeseluruhanBulanan} />}
        </div>
        <div className="chart-card">
          {chartDataKeseluruhanHarian && <Line data={chartDataKeseluruhanHarian} />}
        </div>
      </div>
      <div className="pie-charts">
        <div className="chart-card">
          {pieChartDataMasuk && <Pie data={pieChartDataMasuk} plugins={[centerTextPlugin]} />}
        </div>
        <div className="chart-card">
          {pieChartDataRusak && <Pie data={pieChartDataRusak} plugins={[centerTextPlugin]} />}
        </div>
      </div>
    </div>
  );
};

export default Chartleg;

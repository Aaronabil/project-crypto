import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from '../../contexts/ThemeContext';
import { CryptoData } from '../../contexts/CryptoContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface CryptoChartProps {
  cryptoData: CryptoData;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ cryptoData }) => {
  const { theme } = useTheme();
  
  const rawSparkline = cryptoData.sparkline_in_7d?.price || [];
  const lastPrice = rawSparkline[rawSparkline.length - 1];
  let sparklineData = lastPrice !== cryptoData.current_price
    ? [...rawSparkline, cryptoData.current_price]
    : rawSparkline;

  // Jika perubahan sangat kecil, paksa grafik flat
  if (Math.abs(cryptoData.price_change_percentage_24h) < 0.01) {
    sparklineData = Array(sparklineData.length).fill(cryptoData.current_price);
  }

  const isPositiveChange = cryptoData.price_change_percentage_24h >= 0;

  // Generate labels sesuai jumlah data
  const generateLabels = () => {
    const labels = [];
    const now = new Date();
    const dataLength = sparklineData.length;
    // Estimasi interval (dalam menit) antar data
    const intervalMinutes = 7 * 24 * 60 / (dataLength - 1);
    for (let i = 0; i < dataLength; i++) {
      if (i === dataLength - 1 && lastPrice !== cryptoData.current_price) {
        labels.push('Now');
      } else {
        const date = new Date(now.getTime() - (dataLength - 1 - i) * intervalMinutes * 60 * 1000);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}));
      }
    }
    return labels;
  };

  
  // Chart options and data
  const chartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: cryptoData.name,
        data: sparklineData,
        borderColor: isPositiveChange ? '#10b981' : '#ef4444',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          if (isPositiveChange) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
          }
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: theme === 'dark' ? '#1e1b4b' : '#ffffff',
        titleColor: theme === 'dark' ? '#ffffff' : '#1e2039',
        bodyColor: theme === 'dark' ? '#a5b4fc' : '#4a4d6e',
        borderColor: theme === 'dark' ? '#312e81' : '#e0e7ff',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${parseFloat(context.raw).toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#a1a3b4' : '#4a4d6e',
          font: {
            size: 10,
          },
          maxRotation: 0,
        }
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#a1a3b4' : '#4a4d6e',
          font: {
            size: 10,
          },
          callback: function(value: any) {
            return `$${value.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
    elements: {
      line: {
        borderJoinStyle: 'round'
      }
    }
  };
  
  return (
    <div className="h-64 relative">
      <Line data={chartData} options={chartOptions as any} />
    </div>
  );
};

export default CryptoChart;
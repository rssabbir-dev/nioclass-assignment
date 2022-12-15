import './App.css';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { useEffect, useState } from 'react';
const data = [
	{
		name: 'Easy',
		number: 100,
	},
	{
		name: 'Medium',
		number: 30,
	},
	{
		name: 'Hard',
		number: 50,
	},
];
function App() {
	const [chartData, setChartData] = useState(data);
  const [chartOption, setChartOption] = useState('bar');
  const [loading, setLoading] = useState(true);
	const handleChange = (e) => {
		const element = e.target;
		if (element.value > 100) {
			alert('Please insert number between 0-100');
			element.value = '';
		}
	};
  const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const easy = form.easy.value;
		const medium = form.medium.value;
		const hard = form.hard.value;
		const newData = [
			{
				name: 'Easy',
				number: easy,
			},
			{
				name: 'Medium',
				number: medium,
			},
			{
				name: 'Hard',
				number: hard,
			},
		];
    setChartData(newData);
    localStorage.setItem('data',JSON.stringify(newData))
    form.reset();
  };
  useEffect(() => {
    setLoading(true)
    const localData = JSON.parse(localStorage.getItem('data'));
    if (localData?.length) {
      setChartData(localData)
    }
    setLoading(false)
  }, [])
  if (loading) {
    return (
		<div className='loader-container'>
			<div className='loader'></div>
		</div>
	);
  }
	return (
		<div className='container'>
			<div className='form-container'>
				<form onSubmit={handleSubmit}>
					<input
						name='easy'
						type='number'
						placeholder='Easy Ex: 0-100'
						onChange={handleChange}
						required
					/>
					<input
						name='medium'
						type='number'
						placeholder='Medium Ex: 0-100'
						onChange={handleChange}
						required
					/>
					<input
						name='hard'
						type='number'
						placeholder='Hard Ex:0-100'
						onChange={handleChange}
            required
            
					/>
					<button>Refresh</button>
				</form>
			</div>

			<div className='chart-container'>
				<div className='select-container'>
					<select
						onChange={(e) => setChartOption(e.target.value)}
						name=''
						id=''
					>
						<option value='bar'>Bar</option>
						<option value='line'>Line</option>
					</select>
				</div>
				{chartOption === 'bar' && (
					<BarChart width={430} height={250} data={chartData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='number' fill='#ffa500' />
					</BarChart>
				)}
				{chartOption === 'line' && (
					<LineChart
						width={430}
						height={250}
						data={chartData}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type='monotone'
							dataKey='number'
							stroke='#ffa500'
						/>
					</LineChart>
				)}
      </div>
      <div className='data-container'>
        <h4>Recent Data</h4>
        {
          chartData.map((d,index) => <div key={index}>
            <p>Level: {d.name}</p>
            <p style={{marginBottom:'10px'}}>Value: {d.number}</p>
          </div>)
        }
      </div>
		</div>
	);
}

export default App;

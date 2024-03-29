import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Countdown from './pages/Countdown'
import Portfolio from './pages/Portfolio'
import CV from './components/_CV'
import SalaryCalculator from './pages/SalaryCalculator'
import NotFound from './pages/NotFound'
import Socials from './pages/Socials'
import TimeVisualizationChoose from './pages/TimeVisualization_Choose'
import TimeVisualization from './pages/TimeVisualization'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/about" element={<About />} />

				<Route path="/socials" element={<Socials />} />

				<Route path="/cv" element={<CV />} />

				<Route
					path="/countdown"
					element={<Countdown date="October 13, 2024, 00:00" title="Time until Marino's 25th birthday" />}
				/>

				<Route
					path="/dk"
					element={<Countdown date="October 28, 2023, 08:30" title="Time until plane ride to DK" />}
				/>

				<Route path="/portfolio" element={<Portfolio />} />

				<Route path="/porez-na-dohodak" element={<SalaryCalculator />} />
				<Route path="/porez" element={<Navigate to="/porez-na-dohodak" />} />
				<Route path="/salary" element={<Navigate to="/porez-na-dohodak" />} />

				<Route path="/time-visualization" element={<TimeVisualizationChoose />} />
				<Route path="/time-visualization/start=:startDate&end=:endDate" element={<TimeVisualization />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App

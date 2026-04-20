import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Countdown from './pages/Countdown'
import Portfolio from './pages/Portfolio'
import CV from './pages/CV'
import SalaryCalculator from './pages/SalaryCalculator'
import NotFound from './pages/NotFound'
import Socials from './pages/Socials'
import TimeVisualizationChoose from './pages/TimeVisualization_Choose'
import TimeVisualization from './pages/TimeVisualization'
import Animals from './pages/Pets'
import Coins from './pages/Coins'

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
					element={<Countdown date="November 7, 2028, 16:00" title="Time until the 2028 US presidential election" />}
				/>

				<Route
					path="/birthday"
					element={<Countdown date="October 13, 2026, 00:00" title="Time until Marino's 27th birthday" />}
				/>

				<Route path="/portfolio" element={<Portfolio />} />

				<Route path="/salary/:lang" element={<SalaryCalculator />} />
				<Route path="/salary" element={<Navigate to="/salary/hr" />} />
				<Route path="/porez-na-dohodak" element={<Navigate to="/salary/hr" />} />
				<Route path="/porez" element={<Navigate to="/salary/hr" />} />

				<Route path="/time-visualization" element={<TimeVisualizationChoose />} />
				<Route path="/time-visualization/result" element={<TimeVisualization />} />

				<Route path="/animals" element={<Animals />} />
				<Route path="/pets" element={<Navigate to="/animals" />} />

				<Route path="/coins" element={<Coins />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App

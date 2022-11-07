import { Route, Routes, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Countdown from './pages/Countdown'
import RacunalnaGrafika from './pages/RacunalnaGrafika'
import Post from './components/Post'
import CV from './components/CV'
import SalaryCalculator from './pages/SalaryCalculator'
import NotFound from './pages/NotFound'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/cv" element={<CV />} />
				<Route
					path="/countdown"
					element={<Countdown date="October 13, 2023, 00:00" title="Time until Marino's 24th birthday" />}
				/>
				<Route
					path="/math"
					element={<Countdown date="November 28, 2022, 16:00" title="Time until first Math exam" />}
				/>
				<Route
					path="/1"
					element={<Countdown date="November 15, 2022, 00:00" title="Time until the second RG task" />}
				/>
				<Route
					path="/2"
					element={<Countdown date="November 24, 2022, 00:00" title="Time until the first MT task" />}
				/>
				<Route
					path="/3"
					element={<Countdown date="December 8, 2022, 12:00" title="Time until the Django exam" />}
				/>
				<Route path="/rg" element={<RacunalnaGrafika />} />
				<Route path="/rg/:id" element={<Post />} />

				<Route path="/porez-na-dohodak" element={<SalaryCalculator />} />
				<Route path="/porez" element={<Navigate to="/porez-na-dohodak" />} />
				<Route path="/salary" element={<Navigate to="/porez-na-dohodak" />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App

import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
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
				<Route path="/cv" element={<CV />} />
				<Route
					path="/countdown"
					element={<Countdown date="October 13, 2023, 00:00" title="Time until Marino's 24th birthday" />}
				/>
				<Route path="/rg" element={<RacunalnaGrafika />} />
				<Route path="/rg/:id" element={<Post />} />
				<Route path="/salary" element={<SalaryCalculator />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App

import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Flight from './pages/Flight'
import RacunalnaGrafika from './pages/RacunalnaGrafika'
import NotFound from './pages/NotFound'

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/flight" element={<Flight />} />
				<Route path="/rg" element={<RacunalnaGrafika />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App

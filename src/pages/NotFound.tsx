import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import Navigation from '../components/_Navigation'
import { usePageSEO } from '../hooks/usePageSEO'

const NotFound = () => {
	usePageSEO()
	const mountRef = useRef<HTMLDivElement>(null)

	// noindex override for any unmatched URL
	useEffect(() => {
		document.title = 'Page Not Found — Marino Linić'
		let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
		if (!robots) {
			robots = document.createElement('meta')
			robots.name = 'robots'
			document.head.appendChild(robots)
		}
		robots.content = 'noindex, nofollow'
		return () => { robots?.remove() }
	}, [])

	useEffect(() => {
		const mount = mountRef.current
		if (!mount) return

		// ── renderer ──────────────────────────────────────────────────────────
		// h-dvh not available in Tailwind 3.1 — fall back to window dimensions
		const W0 = mount.clientWidth  || window.innerWidth
		const H0 = mount.clientHeight || window.innerHeight - 64

		const renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		renderer.setSize(W0, H0)
		renderer.setClearColor(0x0c0b14, 1)
		Object.assign(renderer.domElement.style, {
			position: 'absolute', inset: '0', width: '100%', height: '100%', zIndex: '0'
		})
		mount.appendChild(renderer.domElement)

		// ── scene + fog ───────────────────────────────────────────────────────
		const scene = new THREE.Scene()
		scene.fog = new THREE.FogExp2(0x0c0b14, 0.016)

		const camera = new THREE.PerspectiveCamera(60, W0 / H0, 0.1, 200)
		camera.position.set(0, 7, 15)
		camera.lookAt(0, 0, 0)

		// ── soft circular particle texture ────────────────────────────────────
		const makeSprite = () => {
			const c = document.createElement('canvas')
			c.width = c.height = 64
			const cx = c.getContext('2d')!
			const g = cx.createRadialGradient(32, 32, 0, 32, 32, 32)
			g.addColorStop(0,   'rgba(255,255,255,1)')
			g.addColorStop(0.3, 'rgba(255,255,255,0.6)')
			g.addColorStop(1,   'rgba(255,255,255,0)')
			cx.fillStyle = g
			cx.fillRect(0, 0, 64, 64)
			return new THREE.CanvasTexture(c)
		}
		const sprite = makeSprite()

		// ── galaxy spiral ─────────────────────────────────────────────────────
		const GALAXY_N = 10000
		const ARMS     = 3
		const MAX_R    = 8
		const gPos   = new Float32Array(GALAXY_N * 3)
		const gColor = new Float32Array(GALAXY_N * 3)

		const cInner  = new THREE.Color(0xffb3c8)  // warm blush
		const cMid    = new THREE.Color(0x7c70ff)  // tertiary
		const cOuter  = new THREE.Color(0xd94fc0)  // quarnary
		const tmp     = new THREE.Color()

		for (let i = 0; i < GALAXY_N; i++) {
			const arm  = i % ARMS
			const t    = i / GALAXY_N                    // 0 → 1 along arms
			const r    = 0.4 + t * MAX_R
			const spin = r * 1.3
			const base = (arm / ARMS) * Math.PI * 2
			const rx   = (Math.random() - 0.5) * Math.random() ** 2 * r * 0.6
			const ry   = (Math.random() - 0.5) * 0.08 * r
			const rz   = (Math.random() - 0.5) * Math.random() ** 2 * r * 0.6

			gPos[i*3]   = Math.cos(base + spin) * r + rx
			gPos[i*3+1] = ry
			gPos[i*3+2] = Math.sin(base + spin) * r + rz

			if (t < 0.35) tmp.lerpColors(cInner, cMid, t / 0.35)
			else           tmp.lerpColors(cMid, cOuter, (t - 0.35) / 0.65)
			gColor[i*3] = tmp.r; gColor[i*3+1] = tmp.g; gColor[i*3+2] = tmp.b
		}

		const galaxyGeo = new THREE.BufferGeometry()
		galaxyGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3))
		galaxyGeo.setAttribute('color',    new THREE.BufferAttribute(gColor, 3))
		const galaxyMat = new THREE.PointsMaterial({
			size: 0.07, sizeAttenuation: true, vertexColors: true,
			map: sprite, alphaTest: 0.001, transparent: true,
			blending: THREE.AdditiveBlending, depthWrite: false,
		})
		const galaxy = new THREE.Points(galaxyGeo, galaxyMat)
		scene.add(galaxy)

		// ── star field ────────────────────────────────────────────────────────
		const STAR_N  = 6000
		const starPos = new Float32Array(STAR_N * 3)
		for (let i = 0; i < STAR_N * 3; i++) starPos[i] = (Math.random() - 0.5) * 120
		const starGeo = new THREE.BufferGeometry()
		starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
		const starMat = new THREE.PointsMaterial({
			color: 0xffffff, size: 0.05, sizeAttenuation: true,
			map: sprite, alphaTest: 0.001, transparent: true,
			blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7,
		})
		scene.add(new THREE.Points(starGeo, starMat))

		// ── floating wireframe shapes ─────────────────────────────────────────
		type Floater = { mesh: THREE.Mesh; vr: THREE.Euler }
		const floaters: Floater[] = []
		const shapes = [
			{ geo: new THREE.IcosahedronGeometry(0.45, 0), pos: [ 4.5,  1.0, -3.0], col: 0x7c70ff },
			{ geo: new THREE.OctahedronGeometry(0.35),     pos: [-4.0,  0.5,  1.5], col: 0xff5c7c },
			{ geo: new THREE.TetrahedronGeometry(0.4),     pos: [ 1.5, -0.8, -4.0], col: 0xd94fc0 },
			{ geo: new THREE.IcosahedronGeometry(0.28, 0), pos: [-1.8,  1.8,  2.5], col: 0xa580ff },
			{ geo: new THREE.OctahedronGeometry(0.22),     pos: [ 5.0, -0.6,  2.0], col: 0xff5c7c },
			{ geo: new THREE.TetrahedronGeometry(0.32),    pos: [-5.5,  1.2, -1.5], col: 0x7c70ff },
		]
		shapes.forEach(({ geo, pos, col }) => {
			const mat  = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.45 })
			const mesh = new THREE.Mesh(geo, mat)
			mesh.position.set(pos[0], pos[1], pos[2])
			floaters.push({ mesh, vr: new THREE.Euler(
				(Math.random() - 0.5) * 0.012,
				(Math.random() - 0.5) * 0.016,
				(Math.random() - 0.5) * 0.010,
			)})
			scene.add(mesh)
		})

		// ── mouse parallax ────────────────────────────────────────────────────
		const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
		const onMove = (e: MouseEvent) => {
			mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2
			mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
		}
		window.addEventListener('mousemove', onMove)

		// ── resize ────────────────────────────────────────────────────────────
		const onResize = () => {
			const W = mount.clientWidth  || window.innerWidth
			const H = mount.clientHeight || window.innerHeight - 64
			camera.aspect = W / H
			camera.updateProjectionMatrix()
			renderer.setSize(W, H)
		}
		window.addEventListener('resize', onResize)

		// ── animation loop ────────────────────────────────────────────────────
		const t0 = performance.now()
		let raf = 0

		const tick = () => {
			raf = requestAnimationFrame(tick)
			const t = (performance.now() - t0) * 0.001

			// smooth mouse lerp
			mouse.x += (mouse.tx - mouse.x) * 0.04
			mouse.y += (mouse.ty - mouse.y) * 0.04

			// galaxy rotates slowly
			galaxy.rotation.y = t * 0.04

			// floaters spin
			floaters.forEach(({ mesh, vr }) => {
				mesh.rotation.x += vr.x
				mesh.rotation.y += vr.y
				mesh.rotation.z += vr.z
			})

			// camera: gentle orbit + mouse parallax
			camera.position.x = Math.sin(t * 0.05) * 2    +  mouse.x * 1.8
			camera.position.y = 7 + Math.sin(t * 0.07) * 0.8 - mouse.y * 1.2
			camera.position.z = Math.cos(t * 0.05) * 2    + 15
			camera.lookAt(0, 0, 0)

			renderer.render(scene, camera)
		}
		tick()

		// ── cleanup ───────────────────────────────────────────────────────────
		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('mousemove', onMove)
			window.removeEventListener('resize', onResize)
			renderer.dispose()
			sprite.dispose()
			galaxyGeo.dispose(); galaxyMat.dispose()
			starGeo.dispose();   starMat.dispose()
			shapes.forEach(s => s.geo.dispose())
			floaters.forEach(({ mesh }) => (mesh.material as THREE.Material).dispose())
			if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
		}
	}, [])

	return (
		<div className="flex flex-col overflow-hidden" style={{ height: '100vh' }}>
			<Navigation />
			<div ref={mountRef} className="relative flex-1 overflow-hidden">

				{/* text overlay */}
				<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-2" style={{ zIndex: 2 }}>
					<p className="text-[10px] uppercase tracking-[0.4em] text-muted/70 font-semibold">
						error
					</p>
					<h1
						className="font-black leading-none select-none"
						style={{
							fontSize: 'clamp(96px, 16vw, 180px)',
							background: 'linear-gradient(135deg, #7c70ff 0%, #ff5c7c 50%, #d94fc0 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							filter: 'drop-shadow(0 0 6px rgba(124,112,255,0.5)) drop-shadow(0 0 56px rgba(255,92,124,0.3))',
						}}
					>
						404
					</h1>
					<p className="text-muted/80 text-sm mt-1 tracking-wide">
						You're lost in space.
					</p>
					<Link
						to="/"
						className="pointer-events-auto mt-4 text-xs text-muted/60 hover:text-tertiary transition-colors tracking-wide"
					>
						← take me home
					</Link>
				</div>

			</div>
		</div>
	)
}

export default NotFound

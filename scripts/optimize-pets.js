import sharp from 'sharp'
import { readdir, access } from 'fs/promises'
import { join, extname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const INPUT_DIR = join(__dirname, '..', 'public', 'pets')

const FULL_WEBP_QUALITY = 82
const THUMB_WIDTH = 400
const THUMB_WEBP_QUALITY = 75

async function exists(p) {
	try { await access(p); return true } catch { return false }
}

async function main() {
	const files = await readdir(INPUT_DIR)
	const images = files.filter(f => /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/.test(f) && !f.includes('-thumb'))

	let processed = 0
	let skipped = 0

	for (const file of images) {
		const ext = extname(file)
		const stem = basename(file, ext)
		const inputPath = join(INPUT_DIR, file)

		const fullWebp = join(INPUT_DIR, `${stem}.webp`)
		const thumbWebp = join(INPUT_DIR, `${stem}-thumb.webp`)

		const [fullExists, thumbExists] = await Promise.all([exists(fullWebp), exists(thumbWebp)])

		const tasks = []

		if (!fullExists) {
			tasks.push(
				sharp(inputPath)
					.webp({ quality: FULL_WEBP_QUALITY })
					.toFile(fullWebp)
					.then(() => console.log(`  ✓ ${stem}.webp`))
			)
		}

		if (!thumbExists) {
			tasks.push(
				sharp(inputPath)
					.resize(THUMB_WIDTH)
					.webp({ quality: THUMB_WEBP_QUALITY })
					.toFile(thumbWebp)
					.then(() => console.log(`  ✓ ${stem}-thumb.webp`))
			)
		}

		if (tasks.length > 0) {
			await Promise.all(tasks)
			processed++
		} else {
			skipped++
		}
	}

	console.log(`\nDone. ${processed} images processed, ${skipped} already up to date.`)
}

main().catch(err => { console.error(err); process.exit(1) })

import sharp from 'sharp'
import { access, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const INPUT_DIR = join(__dirname, '..', 'public')
const OUTPUT_DIR = join(INPUT_DIR, 'portfolio')

const TARGET_FILES = ['linic.gif', 'clicker.gif', 'character.gif', 'p5.gif']

const FULL_WIDTH = 1200
const FULL_WEBP_QUALITY = 80
const MOBILE_WIDTH = 800
const MOBILE_WEBP_QUALITY = 76

async function exists(path) {
	try {
		await access(path)
		return true
	} catch {
		return false
	}
}

async function main() {
	await mkdir(OUTPUT_DIR, { recursive: true })

	let processed = 0
	let skipped = 0

	for (const file of TARGET_FILES) {
		const inputPath = join(INPUT_DIR, file)
		const stem = basename(file, extname(file))

		if (!(await exists(inputPath))) {
			console.log(`  - Missing source: ${file}`)
			continue
		}

		const fullWebp = join(OUTPUT_DIR, `${stem}.webp`)
		const mobileWebp = join(OUTPUT_DIR, `${stem}-mobile.webp`)
		const [fullExists, mobileExists] = await Promise.all([exists(fullWebp), exists(mobileWebp)])

		const tasks = []
		const isAnimatedGif = /\.gif$/i.test(file)
		const readOptions = isAnimatedGif ? { animated: true } : undefined

		if (!fullExists) {
			tasks.push(
				sharp(inputPath, readOptions)
					.resize(FULL_WIDTH, undefined, { withoutEnlargement: true })
					.webp({ quality: FULL_WEBP_QUALITY })
					.toFile(fullWebp)
					.then(() => console.log(`  ✓ ${stem}.webp`))
			)
		}

		if (!mobileExists) {
			tasks.push(
				sharp(inputPath, readOptions)
					.resize(MOBILE_WIDTH, undefined, { withoutEnlargement: true })
					.webp({ quality: MOBILE_WEBP_QUALITY })
					.toFile(mobileWebp)
					.then(() => console.log(`  ✓ ${stem}-mobile.webp`))
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

main().catch((err) => {
	console.error(err)
	process.exit(1)
})

#!/usr/bin/env node
/**
 * Download coin images from Numista API v3
 *
 * Usage:
 *   node scripts/download-coin-images.js <NUMISTA_API_KEY>
 *
 * Register for a free API key at: https://en.numista.com/api/index.php
 *
 * This script reads coins.json, searches Numista for each unique coin type,
 * downloads the obverse image, and saves it to public/coins/.
 * Already-downloaded images are skipped.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const COINS_JSON = join(ROOT, 'src', 'data', 'coins.json')
const OUT_DIR = join(ROOT, 'public', 'coins')

const API_KEY = process.argv[2]
if (!API_KEY) {
	console.error('Usage: node scripts/download-coin-images.js <NUMISTA_API_KEY>')
	console.error('Register for free at: https://en.numista.com/api/index.php')
	process.exit(1)
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

/* ── helpers ────────────────────────────────────────── */

function countrySlug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function coinFilename(coin) {
	const denom = coin['denom.'].replace(/\s+/g, '-')
	const comm = coin.commemorative ? '-comm' : ''
	return `${countrySlug(coin.country)}-${coin.amount}-${denom}-${coin.year}${comm}.webp`
}

function sleep(ms) {
	return new Promise(r => setTimeout(r, ms))
}

function fetchJSON(url, headers = {}) {
	return new Promise((resolve, reject) => {
		const req = https.get(url, { headers }, (res) => {
			let data = ''
			res.on('data', chunk => data += chunk)
			res.on('end', () => {
				try {
					resolve(JSON.parse(data))
				} catch (e) {
					reject(new Error(`JSON parse error: ${data.substring(0, 200)}`))
				}
			})
		})
		req.on('error', reject)
		req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')) })
	})
}

function downloadFile(url, dest) {
	return new Promise((resolve, reject) => {
		const req = https.get(url, (res) => {
			if (res.statusCode === 301 || res.statusCode === 302) {
				return downloadFile(res.headers.location, dest).then(resolve).catch(reject)
			}
			if (res.statusCode !== 200) {
				reject(new Error(`HTTP ${res.statusCode}`))
				return
			}
			const chunks = []
			res.on('data', chunk => chunks.push(chunk))
			res.on('end', () => {
				writeFileSync(dest, Buffer.concat(chunks))
				resolve()
			})
		})
		req.on('error', reject)
		req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')) })
	})
}

/* ── main ───────────────────────────────────────────── */

async function main() {
	const coins = JSON.parse(readFileSync(COINS_JSON, 'utf-8'))

	// Deduplicate: group by unique coin type
	const unique = new Map()
	for (const coin of coins) {
		const key = `${coin.country}|${coin.currency}|${coin['denom.']}|${coin.amount}|${coin.commemorative}`
		if (!unique.has(key)) unique.set(key, coin)
	}

	const toProcess = [...unique.values()]
	console.log(`Found ${toProcess.length} unique coin types to download images for.`)

	let downloaded = 0
	let skipped = 0
	let failed = 0

	for (let i = 0; i < toProcess.length; i++) {
		const coin = toProcess[i]
		const filename = coinFilename(coin)
		const dest = join(OUT_DIR, filename)

		if (existsSync(dest)) {
			skipped++
			continue
		}

		// Build search query
		const query = [
			coin.country.replace('&', 'and'),
			coin.amount,
			coin['denom.'],
			coin.commemorative || '',
		].filter(Boolean).join(' ')

		console.log(`[${i + 1}/${toProcess.length}] Searching: ${query} (${coin.year})`)

		try {
			// Search Numista (v2 API — v3 does not exist)
			const searchUrl = `https://api.numista.com/api/v2/coins?q=${encodeURIComponent(query)}&lang=en&count=5`
			const searchResult = await fetchJSON(searchUrl, { 'Numista-API-Key': API_KEY })

			if (!searchResult.coins || searchResult.coins.length === 0) {
				console.log(`  ⚠ No results found`)
				failed++
				await sleep(500)
				continue
			}

			// Find best match: prefer standard circulation coin in the right year range
			let bestCoin = searchResult.coins[0]
			for (const result of searchResult.coins) {
				const isCirculation = result.object_type?.id === 1
				const yearMatch = result.min_year <= coin.year && (!result.max_year || result.max_year >= coin.year)
				if (yearMatch && isCirculation) {
					bestCoin = result
					break
				}
				if (yearMatch && !bestCoin._matched) {
					bestCoin = result
					bestCoin._matched = true
				}
			}

			// Use the thumbnail from search results (saves an API call vs fetching details)
			const imageUrl = bestCoin.obverse_thumbnail || bestCoin.reverse_thumbnail || null

			if (!imageUrl) {
				console.log(`  ⚠ No image available for: ${bestCoin.title}`)
				failed++
				await sleep(500)
				continue
			}

			// Download image
			console.log(`  ✓ Downloading: ${bestCoin.title}`)
			await downloadFile(imageUrl, dest)
			downloaded++

			// Rate limiting: stay well under quota
			await sleep(1200)

		} catch (err) {
			console.log(`  ✗ Error: ${err.message}`)
			failed++
			await sleep(1000)
		}
	}

	// Create marker file so the app knows images are available
	if (downloaded > 0 || skipped > 0) {
		writeFileSync(join(OUT_DIR, '.exists'), 'ok')
		console.log('Created .exists marker file')
	}

	console.log(`\nDone! Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`)
}

main().catch(err => {
	console.error('Fatal error:', err)
	process.exit(1)
})

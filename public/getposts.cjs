const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '../src/assets/content/rg')
let postList = []

const getPosts = async () => {
	await fs.readdir(dirPath, (err, files) => {
		if (err) return console.log('Failed to list contents of directory: ' + err)
		files.forEach((file, index) => {
			let obj = {}
			let post
			fs.readFile(`${dirPath}/${file}`, 'utf8', (err, contents) => {
				getMetadataIndices = (accumulator, elem, index) => {
					if (/^---/.test(elem)) {
						accumulator.push(index)
					}
					return accumulator
				}
				const parseMetadata = ({ lines, metadataIndices }) => {
					if (metadataIndices.length > 0) {
						let metadata = lines.slice(metadataIndices[0] + 1, metadataIndices[1])
						metadata.forEach((line) => {
							obj[line.split(': ')[0]] = line.split(': ')[1]
						})
						console.log(obj)
						return obj
					}
				}
				const lines = contents.split('\n')
				const metadataIndices = lines.reduce(getMetadataIndices, [])
				const metadata = parseMetadata({ lines, metadataIndices })
			})
		})
	})
}

getPosts()

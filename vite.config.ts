import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import replace from '@rollup/plugin-replace'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		{ enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */) },
		react(),
		replace({
			'process.env': JSON.stringify(process.env)
		})
	]
})

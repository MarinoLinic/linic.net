import postList from '../assets/rgPosts.json'
import NotFound from '../pages/NotFound'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Post = () => {
	const [found, setFound] = useState(false)
	let { id } = useParams()
	return (
		<div>
			{postList.length &&
				postList.map((post, i) => {
					if (post.id === Number(id)) {
						return (
							<div className="flex flex-col items-center justify-center mt-16 mx-10">
								<div className="md:w-1/3 md:max-w-1/3">
									<div className="text-center flex flex-col justify-center items-center">
										<h2>{post.title}</h2>
										<p className="mt-2 font-mono text-quarnary">
											{post.date} by {post.author}
										</p>
										<img
											src={post.image}
											alt="Post image"
											className="object-cover mt-2 w-full md:max-w-[500px] h-auto"
										/>
									</div>
									<div className="my-12">
										<ReactMarkdown
											children={post.content}
											rehypePlugins={[rehypeRaw]}
											remarkPlugins={[remarkGfm]}
										/>
									</div>
								</div>
								<p className="m-8 text-gray-600">Računalna grafika, 2022./2023.</p>
							</div>
						)
					} else if (i === postList.length - 1 && !found) {
						return <NotFound />
					}
				})}
		</div>
	)
}

export default Post

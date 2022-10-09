import postList from '../assets/rgPosts.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { useParams } from 'react-router-dom'

const Post = () => {
	let { id } = useParams()
	return (
		<div>
			{postList.length &&
				postList.map((post, i) => {
					if (post.id === Number(id)) {
						return (
							<div className="flex flex-col items-center justify-center mt-16 mx-10">
								<div className="md:w-1/3 md:max-w-1/3">
									<div className="text-center">
										<h2>{post.title}</h2>
										<p className="mt-2 font-mono text-quarnary">
											{post.date} by {post.author}
										</p>
									</div>
									<div className="my-12">
										<ReactMarkdown
											children={post.content}
											rehypePlugins={[rehypeRaw]}
											remarkPlugins={[remarkGfm]}
										/>
									</div>
								</div>
							</div>
						)
					}
				})}
		</div>
	)
}

export default Post

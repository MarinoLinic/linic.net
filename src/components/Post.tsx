import postList from '../assets/rgPosts.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'
import { useParams } from 'react-router-dom'

const Post = () => {
	let { id } = useParams()
	return (
		<div>
			{postList.length &&
				postList.map((post, i) => {
					if (post.id == id) {
						return (
							<div>
								<h2>{post.title}</h2>
								<small>
									Published on {post.date} by {post.author}
								</small>
								<hr />
								<ReactMarkdown children={post.content} rehypePlugins={[rehypeRaw]} />
							</div>
						)
					}
				})}
		</div>
	)
}

export default Post

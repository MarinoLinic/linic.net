import postList from '../assets/rgPosts.json'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeRaw from 'rehype-raw'

const PostList = () => {
	const excerptList = postList.map((post) => {
		return post.content.split(' ').slice(0, 10).join(' ')
	})
	return (
		<div>
			{postList.length &&
				postList.map((post, i) => {
					return (
						<div>
							<h2>{post.title}</h2>
							<small>
								Published on {post.date} by {post.author}
							</small>
							<hr />
							<ReactMarkdown children={excerptList[i]} rehypePlugins={[rehypeRaw]} />
							<small>Read more...</small>
						</div>
					)
				})}
		</div>
	)
}

export default PostList

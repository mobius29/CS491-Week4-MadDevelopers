import SearchPostListContainer from '../Containers/Post/SearchPostListContainer'
import PostListContainer from './../Containers/Post/PostListContainer'

interface IProps {
  allPosts: boolean
}

const PostListPage = ({ allPosts }: IProps) => {
  return <>{allPosts ? <PostListContainer /> : <SearchPostListContainer />}</>
}

export default PostListPage

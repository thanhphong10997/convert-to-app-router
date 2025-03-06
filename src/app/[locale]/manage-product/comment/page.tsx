// Next
import { NextPage } from 'next'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import CommentListPage from 'src/views/layouts/pages/manage-product/comment/CommentList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <CommentListPage />
    </AuthLayoutWrapper>
  )
}

export default Index

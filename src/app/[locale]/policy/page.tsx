import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import BlankLayout from 'src/views/layouts/BlankLayout'

export default function Home() {
  return (
    <>
      <AuthLayoutWrapper
        guestGuard={false}
        authGuard={false}
        getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}
      >
        <p>
          Our Community Guidelines define what we do and don’t allow on my site. They exist so that we can protect the
          community from things such as harmful content, harassment, and spam. They apply to everyone, and to all types
          of content on my site - such as videos, comments, links, and thumbnails.
        </p>
      </AuthLayoutWrapper>
    </>
  )
}

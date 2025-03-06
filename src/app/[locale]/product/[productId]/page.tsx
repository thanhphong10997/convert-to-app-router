// Next
import { NextPage } from 'next'
import Head from 'next/head'

// React
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getDetailsProductPublicBySlug, getListRelatedProductBySlug } from 'src/services/product'
import { TProduct } from 'src/types/product'
import { getTextFromHTML } from 'src/utils'

// views
import { LayoutNotApp } from 'src/views/layouts/LayoutNotApp'
import DetailsProductPage from 'src/views/layouts/pages/product/DetailsProduct'

type TProps = {
  productData: TProduct
  relatedProductList: TProduct[]
}

export const generateMetadata = async ({ params: { slugId } }: { params: { slugId: string } }) => {
  const res = await getDetailsProductPublicBySlug(slugId)
  const productData = res?.data

  return {
    title: `Ecommerce-shop - ${productData?.name}`,
    description: productData?.description,
    keywords: `Ecommerce-shop - ${productData?.name} - ${productData?.slug}`,
    openGraph: {
      images: productData?.image,
      title: `Ecommerce-shop - ${productData?.name}`,
      description: productData?.description,
      type: 'website',
      url: `https://convert-to-app-router-nextjs.vercel.app/product/${productData?.slug}`
    },
    twitter: {
      images: productData?.image,
      title: `Ecommerce-shop - ${productData?.name}`,
      description: productData?.description,
      type: 'website',
      url: `https://convert-to-app-router-nextjs.vercel.app/product/${productData?.slug}`
    }
  }
}

const getDetailsProduct = async (slugId: string) => {
  try {
    const res = await getDetailsProductPublicBySlug(slugId, true)
    const productData = res?.data
    const resRelated = await getListRelatedProductBySlug({ params: { slug: slugId } })
    const relatedProductList = resRelated?.data?.products

    if (!productData?._id) {
      return {
        notFound: true
      }
    }

    return {
      productData: productData,
      relatedProductList: relatedProductList
    }
  } catch (err) {
    return {
      productData: {},
      relatedProductList: []
    }
  }
}

const Index = async ({ params: { productId } }: { params: { productId: string } }) => {
  const { productData, relatedProductList } = await getDetailsProduct(productId)

  // const description = getTextFromHTML(productData?.description)
  const description = ''

  return (
    <>
      <AuthLayoutWrapper
        authGuard={false}
        guestGuard={false}
        getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
      >
        <Head>
          <title>{productData?.name}</title>
          <meta name='description' content={productData?.description} />
          <meta name='author' content='Phong cute' />
          <meta name='name' content='Shop bán hàng điện tử' />
          <meta name='image' content={productData?.image} />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          {/* custom meta for facebook */}
          <meta property='og:type' content='website' />
          <meta property='og:title' content={productData?.name} />
          <meta property='og:description' content={productData?.description} />
          <meta property='og:image' content={productData?.image} />
          {/* custom meta for twitter(X) */}
          <meta property='twitter:card' content='website' />
          <meta property='twitter:title' content={productData?.name} />
          <meta property='twitter:description' content={productData?.description} />
          <meta property='twitter:image' content={productData?.image} />
        </Head>
        <DetailsProductPage productDataServer={productData} relatedProductListServer={relatedProductList} />
      </AuthLayoutWrapper>
    </>
  )
}

export default Index

export const dynamic = 'force-dynamic'
export const maxDuration = 60

import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts, preview }) {
  let heroPost = allPosts.filter(p => decodeURIComponent(p.slug) == "the-great-indian-travelogue")[0]
  if(!heroPost){
    heroPost = allPosts[0]
  }
  const morePosts = allPosts.filter(p => decodeURIComponent(p.slug) != heroPost.slug)

  return (
    <Layout preview={preview}>
      <Head>
        <title>1Next.js Blog Example with {CMS_NAME} and Static Web Apps</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.featured_image}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPosts()

  return {
    props: { allPosts, preview },
    revalidate: 10,
  }
}

import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import { BlogPost, getBlogPostsById } from '../../util/database';
import { PostResponseBody } from '../api/blogPosts/[singlePostId]';

type Props = {
  blogPosts: BlogPost;
  refreshUserProfile: () => void;
  userObject: { username: string };
};

export default function SingleBlogPost(props: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  // State Variable with the id of the animal on editMode
  const [idEditPostId, setIdEditPostId] = useState<number>();
  // State Variables for the on Edit inputs
  const [titleOnEdit, setTitleOnEdit] = useState('');
  const [storyOnEdit, setStoryOnEdit] = useState('');

  const [error, setError] = useState('');

  const router = useRouter();

  async function deletePost(id: number) {
    const deleteResponse = await fetch(`/api/blogPosts/${id}`, {
      method: 'DELETE',
    });
    const deleteResponseBody =
      (await deleteResponse.json()) as PostResponseBody;

    if ('error' in deleteResponseBody) {
      setError(deleteResponseBody.error);
      return;
    }

    const newPostsList = posts.filter((post) => {
      return deleteResponseBody.post.id !== post.id;
    });

    setPosts(newPostsList);
    props.refreshUserProfile();
    await router.push('/');
  }

  return (
    <Layout userObject={props.userObject}>
      <div className={styles.singleProduct}>
        <div>
          <Head>
            <title>Posts</title>
            <meta name="description" content="This are my posts" />
          </Head>
          <div> {props.blogPosts.title}</div>
          <div> {props.blogPosts.story} </div>
          <button
            onClick={() => {
              deletePost(props.blogPosts.id).catch(() => {});
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
}

// Code in getServerSideProps runs only in
// Node.js, and allows you to do fancy things:
// - Read files from the file system
// - Connect to a (real) database
//
// getServerSideProps is exported from your files
// (ONLY FILES IN /pages) and gets imported
// by Next.js
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const addedProductsOnCookies = context.req.cookies.addedProducts || '[]';

  const blogPostId = context.query.blogPostId;

  const blogPosts = await getBlogPostsById(blogPostId);

  console.log('db', blogPosts);

  // const addedProducts = JSON.parse(addedProductsOnCookies);
  // if there is no addedProducts cookie on the browser we store to an [] otherwise we get the cookie value and parse it

  // Important:
  // - Always return an object from getServerSideProps
  // - Always return a key in that object that is
  // called props

  // 1. get the cookies from the browser
  // 2. pass the cookies to the frontend
  return {
    props: {
      // In the props object, you can pass back
      // whatever information you want

      blogPosts,
    },
  };
}

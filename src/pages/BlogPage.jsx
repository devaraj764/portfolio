import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { getAllPosts } from "../data/blogLoader";

const posts = getAllPosts();

export default function BlogPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Blog — DevaRaju Maddhu</title>
        <meta name="description" content="Thoughts on web development, AI engineering, LangChain, LangGraph, and building modern applications." />
        <meta property="og:title" content="Blog — DevaRaju Maddhu" />
        <meta property="og:description" content="Thoughts on web development, AI engineering, LangChain, LangGraph, and building modern applications." />
        <meta property="og:url" content="https://devarajumaddhu.dev/blog" />
        <link rel="canonical" href="https://devarajumaddhu.dev/blog" />
      </Helmet>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Blog</h2>
      </div>

      {posts.length === 0 ? (
        <p className="muted-text">No posts yet. Check back soon.</p>
      ) : (
        <div className="blog-list">
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="blog-card"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="blog-card-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-card-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </PageTransition>
  );
}

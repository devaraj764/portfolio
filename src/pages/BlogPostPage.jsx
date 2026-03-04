import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BiArrowBack } from "react-icons/bi";
import PageTransition from "../components/PageTransition";
import { getPostBySlug } from "../data/blogLoader";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <PageTransition>
        <Link to="/blog" className="blog-post-back">
          <BiArrowBack size="18" /> Back to blog
        </Link>
        <h1 className="heading">Post not found</h1>
        <p className="muted-text">
          The blog post you're looking for doesn't exist.
        </p>
      </PageTransition>
    );
  }

  const pageTitle = `${post.title} — DevaRaju Maddhu`;
  const pageDescription = post.excerpt || `Read ${post.title} by DevaRaju Maddhu.`;
  const pageUrl = `https://devarajumaddhu.dev/blog/${slug}`;

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>
      <Link to="/blog" className="blog-post-back">
        <BiArrowBack size="18" /> Back to blog
      </Link>

      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-date">{post.date}</span>
          <div className="blog-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-card-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </PageTransition>
  );
}

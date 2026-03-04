import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BiArrowBack, BiShow } from "react-icons/bi";
import PageTransition from "../components/PageTransition";
import { getProjectBySlug } from "../data/projectLoader";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <PageTransition>
        <Link to="/projects" className="blog-post-back">
          <BiArrowBack size="18" /> Back to projects
        </Link>
        <h1 className="heading">Project not found</h1>
        <p className="muted-text">
          The project you're looking for doesn't exist.
        </p>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Link to="/projects" className="blog-post-back">
        <BiArrowBack size="18" /> Back to projects
      </Link>

      <div className="blog-post-header">
        <h1>{project.title}</h1>
        <div className="blog-post-meta">
          {project.company && (
            <span className="blog-post-date">{project.company}</span>
          )}
          {project.duration && (
            <span className="blog-post-date">{project.duration}</span>
          )}
          {project.visit_link && (
            <a
              href={project.visit_link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
              style={{ fontSize: "0.82rem", padding: "4px 12px" }}
            >
              <BiShow size="14" /> Visit
            </a>
          )}
        </div>
        <div className="blog-card-tags" style={{ marginTop: 12 }}>
          {project.tags.map((tag) => (
            <span key={tag} className="blog-card-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {project.content}
        </ReactMarkdown>
      </div>
    </PageTransition>
  );
}

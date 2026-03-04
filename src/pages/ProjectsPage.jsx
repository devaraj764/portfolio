import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { getAllProjects } from "../data/projectLoader";

const projects = getAllProjects();

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Projects</h2>
      </div>

      {projects.length === 0 ? (
        <p className="muted-text">No projects yet. Check back soon.</p>
      ) : (
        <div className="card-list">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="blog-card"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="exp-card-header">
                  <h3 className="exp-card-title">
                    <span className="project-number">#{String(index + 1).padStart(2, '0')}</span>{' '}
                    {project.title}
                  </h3>
                  <span className="exp-card-duration">{project.duration}</span>
                </div>
                <p className="exp-card-description">{project.excerpt}</p>
                {project.note && (
                  <span className="note-text">Note: {project.note}</span>
                )}
                <div className="blog-card-tags" style={{ marginTop: 16 }}>
                  {project.tags.map((tag) => (
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

import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import PageTransition from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <Link href="/" className="blog-post-back">
        <BiArrowBack size="18" /> Back to home
      </Link>
      <h1 className="heading">Page not found</h1>
      <p className="muted-text">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </PageTransition>
  );
}

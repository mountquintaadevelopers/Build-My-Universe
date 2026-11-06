import Link from 'next/link';
import { blogsPageContent, formatBlogDate } from '@/data/blogs/blogPosts';
import type { BlogPost } from '@/types/blogs';
import styles from './BlogsArticle.module.css';

export default function BlogsArticle({ post }: { post: BlogPost }) {
  const { backLabel, disclaimer } = blogsPageContent;

  return (
    <article className={styles.article}>
      <Link href="/blogs" className={styles.back}>
        ← {backLabel}
      </Link>

      <header className={styles.header}>
        <p className={styles.meta}>
          <span className={styles.category}>{post.category}</span>
          <time dateTime={post.publishedOn}>{formatBlogDate(post.publishedOn)}</time>
        </p>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.excerpt}>{post.excerpt}</p>
      </header>

      {post.sections.map((section) => (
        <section className={styles.section} key={section.heading}>
          <h2 className={styles.sectionHeading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p className={styles.paragraph} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      <p className={styles.disclaimer}>{disclaimer}</p>
    </article>
  );
}

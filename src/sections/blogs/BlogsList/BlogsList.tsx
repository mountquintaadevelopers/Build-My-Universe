import Link from 'next/link';
import {
  blogPosts,
  blogsPageContent,
  formatBlogDate,
} from '@/data/blogs/blogPosts';
import styles from './BlogsList.module.css';

export default function BlogsList() {
  const { eyebrow, title, description, readMoreLabel } = blogsPageContent;

  return (
    <section className={styles.blogs}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      <div className={styles.grid}>
        {blogPosts.map((post) => (
          <Link href={`/blogs/${post.slug}`} className={styles.card} key={post.slug}>
            <p className={styles.meta}>
              <span className={styles.category}>{post.category}</span>
              <time dateTime={post.publishedOn}>{formatBlogDate(post.publishedOn)}</time>
            </p>
            <h2 className={styles.cardTitle}>{post.title}</h2>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <span className={styles.readMore}>{readMoreLabel} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

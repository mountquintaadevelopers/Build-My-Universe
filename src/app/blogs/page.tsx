import type { Metadata } from 'next';
import { blogsPageContent } from '@/data/blogs/blogPosts';
import BlogsList from '@/sections/blogs/BlogsList/BlogsList';

export const metadata: Metadata = {
  title: 'Blogs',
  description: blogsPageContent.description,
};

export default function BlogsPage() {
  return (
    <main>
      <BlogsList />
    </main>
  );
}

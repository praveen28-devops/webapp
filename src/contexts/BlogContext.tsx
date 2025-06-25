import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BlogPost } from '../types/blog';
import { supabase } from '../utils/supabaseClient';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => BlogPost | undefined;
  searchPosts: (query: string) => BlogPost[];
  getPostsByCategory: (category: string) => BlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Fetch posts from Supabase on mount
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('publishedAt', { ascending: false });
      if (!error && data) setPosts(data as BlogPost[]);
    };
    fetchPosts();
  }, []);

  const addPost = async (postData: Omit<BlogPost, 'id'>) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{ ...postData }])
      .select();
    if (error) {
      console.error('Supabase insert error:', error);
    }
    if (!error && data) setPosts(prev => [data[0] as BlogPost, ...prev]);
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...postData, updatedAt: new Date().toISOString().split('T')[0] })
      .eq('id', id)
      .select();
    if (!error && data) setPosts(prev => prev.map(post => post.id === id ? { ...post, ...data[0] } : post));
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    if (!error) setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPost = (id: string) => posts.find(post => post.id === id);

  const searchPosts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post =>
      post.status === 'published' &&
      (post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  };

  const getPostsByCategory = (category: string) => {
    return posts.filter(post =>
      post.status === 'published' &&
      post.category.toLowerCase() === category.toLowerCase()
    );
  };

  return (
    <BlogContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      getPost,
      searchPosts,
      getPostsByCategory,
    }}>
      {children}
    </BlogContext.Provider>
  );
};
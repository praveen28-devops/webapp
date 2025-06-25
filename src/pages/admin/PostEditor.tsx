import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';
import { BlogPost } from '../../types/blog';
import AdminLayout from './AdminLayout';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addPost, updatePost, getPost } = useBlog();
  
  const isEditing = Boolean(id);
  const existingPost = isEditing ? getPost(id!) : null;

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Software Development' as BlogPost['category'],
    tags: '',
    status: 'draft' as BlogPost['status'],
    featuredImage: '',
    readTime: 5,
  });

  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        category: existingPost.category,
        tags: existingPost.tags.join(', '),
        status: existingPost.status,
        featuredImage: existingPost.featuredImage || '',
        readTime: existingPost.readTime,
      });
    }
  }, [existingPost]);

  const handleSubmit = async (e: React.FormEvent, status: BlogPost['status']) => {
    e.preventDefault();
    
    const postData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: 'Gokul M',
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      publishedAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status,
      featuredImage: formData.featuredImage || undefined,
      readTime: formData.readTime,
    };

    if (isEditing && id) {
      await updatePost(id, postData);
    } else {
      await addPost(postData);
    }

    navigate('/admin');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'readTime' ? parseInt(value) || 0 : value,
    }));
  };

  const handleContentChange = ({ text }: { text: string }) => {
    setFormData(prev => ({ ...prev, content: text }));
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-gray-600 mt-2">
              {isEditing ? 'Make changes to your post' : 'Write and publish a new blog post'}
            </p>
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <form className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            {/* Title */}
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter post title"
              />
            </div>

            {/* Excerpt */}
            <div className="mb-6">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the post"
              />
            </div>

            {/* Content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div className="border rounded-lg shadow-sm overflow-hidden">
                <MdEditor
                  value={formData.content}
                  style={{ height: '400px', border: 'none' }}
                  renderHTML={text => text}
                  onChange={handleContentChange}
                  config={{
                    view: {
                      menu: true,
                      md: true,
                      html: true,
                    },
                    canView: {
                      menu: true,
                      md: true,
                      html: true,
                      fullScreen: true,
                      hideMenu: true,
                    },
                    shortcuts: true,
                    placeholder: 'Write your post content here... (Supports markdown, code blocks, and images)',
                    imageAccept: '.jpg,.png,.jpeg,.gif,.webp',
                    imageUrl: 'https://',
                    syncScrollMode: ['leftFollowRight', 'rightFollowLeft'],
                  }}
                  onImageUpload={async (file, callback) => {
                    // For now, use a local URL preview. For production, upload to a storage service and use the URL.
                    const reader = new FileReader();
                    reader.onload = () => {
                      callback(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Use <span className="font-mono bg-gray-100 px-1 rounded">```</span> for code blocks, and the image button to insert images inline.
              </p>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Software Development">Software Development</option>
                </select>
              </div>

              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Read Time (minutes)
                </label>
                <input
                  type="number"
                  id="readTime"
                  name="readTime"
                  min="1"
                  max="60"
                  value={formData.readTime}
                  onChange={handleInputChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate multiple tags with commas (e.g., react, typescript, tutorial)
              </p>
            </div>

            {/* Featured Image */}
            <div className="mb-6">
              <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                id="featuredImage"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommended: Use images from Pexels or other free stock photo sites
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'draft')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 inline mr-2" />
              Save as Draft
            </button>
            
            <button
              type="button"
              onClick={(e) => handleSubmit(e, 'published')}
              className="px-6 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Eye className="h-4 w-4 inline mr-2" />
              Publish
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PostEditor;
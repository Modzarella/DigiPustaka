import React, { useState } from 'react';
import Navbar from '../components/navbar';

const ForumPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'BebekHitamPakQris',
      avatar: '/avatars/user1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
      timestamp: '2 jam yang lalu',
      likes: 5,
      replies: 2
    },
    {
      id: 2,
      author: 'Lebah Ganteng',
      avatar: '/avatars/user2.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
      timestamp: '3 jam yang lalu',
      likes: 3,
      replies: 1
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'fiction', name: 'Fiksi' },
    { id: 'non-fiction', name: 'Non-Fiksi' },
    { id: 'education', name: 'Pendidikan' },
    { id: 'literature', name: 'Sastra' }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
const handleLikesChange = (id) => {
  setComments(prevComments =>
    prevComments.map(comment =>
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    )
  );
};


  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      author: 'Mamat Gunshop', // This would normally come from authenticated user
      avatar: '/avatars/user-default.jpg',
      content: newComment,
      timestamp: 'Baru saja',
      likes: 0,
      replies: 0
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Categories */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* New Comment Input */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <form onSubmit={handleCommentSubmit} className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tambahkan Komentar"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                rows="3"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{comment.author}</h3>
                    <span className="text-sm text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{comment.content}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700" onClick={() => handleLikesChange(comment.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{comment.replies}</span>
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">Balas</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
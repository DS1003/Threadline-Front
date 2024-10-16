import React, { useState, useRef } from 'react';
import { Edit3, Image, X } from 'lucide-react';
import {fetchRequest} from '../api';
import Swal from 'sweetalert2';

export default function CreatePostCard({ onAddPost }) {
  const [postContent, setPostContent] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      setSelectedFile(file);
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Invalid file type',
        text: 'Please select an image or video file.',
      });

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Créez l'objet post à ajouter
    const newPost = {
      content: postContent,
      tags: tags,
      file: selectedFile,
    };

    // Appelez votre fonction pour ajouter le post localement
    onAddPost(newPost);

    
    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('tags', JSON.stringify(tags)); // Pour envoyer les tags en tant que JSON
    if (selectedFile) {
      formData.append('content', selectedFile); // Ajoutez le fichier s'il existe
    }

    try {

      const token = localStorage.getItem('token'); // Récupération du token
      const response = await fetchRequest('POST', 'http://localhost:5000/api/v1/post/create', formData, token);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Post successfully created:', responseData);
      
      // Réinitialiser les champs
      setPostContent('');
      setTags([]);
      setSelectedFile(null);
      Swal.fire({
        icon: 'success',
        title: 'Post created!',
        text: 'Your post has been successfully created.',
      });
    } catch (error) {
      console.error('Error creating post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'An error occurred while creating the post.',
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl">
      <div className="flex items-center mb-4">
        <Edit3 className="w-5 h-5 text-[#CC8C87] mr-2" />
        <span className="text-gray-600 font-medium">Create Post</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/100100154?v=4"
            alt="User avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <textarea
            className="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            placeholder="What's on your mind?"
            rows={3}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Add a tag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-[#CC8C87] text-white px-4 py-2 rounded-r-lg hover:bg-[#cc8c87ce] focus:outline-none focus:ring-2 focus:ring-[#CC8C87]"
            >
              Add Tag
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Image className="w-5 h-5 text-green-500 mr-1" />
              <span className="text-sm">Photo/Video</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
          {selectedFile && (
            <div className="text-sm text-gray-600">
              File selected: {selectedFile.name}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#CC8C87] text-white px-4 py-2 rounded-lg hover:bg-[#cc8c87ce] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Post
        </button>
      </form>
    </div>
  );
}

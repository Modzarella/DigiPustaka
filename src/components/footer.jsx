import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-400">
          <p className="mb-4">Hubungi saya:</p>
          <div className="space-x-4">
            <a href="mailto:email@example.com" className="hover:text-white">email@example.com</a>
            <span>|</span>
            <a href="https://instagram.com/username" className="hover:text-white">Instagram: @username</a>
            <span>|</span>
            <a href="https://github.com/githu.com" className="hover:text-white">Github: githu.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

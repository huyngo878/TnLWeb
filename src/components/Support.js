import React, { useState } from 'react';
import Layout from './Layout'; // Import Layout for consistent navbar and footer

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);

    // Here you can integrate email or database API to send feedback
    alert('Your feedback has been submitted. Thank you!');
    setSubmitted(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      feedback: '',
    });
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-5 text-white min-h-screen flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Support</h1>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-gray-4 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-100">
              Submit Your Feedback
            </h2>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm text-gray-200">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-6 text-white focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-6 text-white focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="feedback" className="block mb-2 text-sm text-gray-200">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-6 text-white focus:outline-none"
                placeholder="Share your feedback or report an issue"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-2 hover:bg-gray-6 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-3">Thank you for your feedback!</h2>
            <p className="text-gray-3">We appreciate your input and will review it promptly.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Support;

import React, { useState, useEffect } from 'react';
import '../src/form.css'

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await fetch(`https://api.example.com/questions?topic=${topic}`);
      const data = await response.json();
      setAdditionalQuestions(data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';

    if (formData.surveyTopic === 'Technology') {
      if (!formData.favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) newErrors.yearsOfExperience = 'Years of Experience is required and must be a number greater than 0';
    }

    if (formData.surveyTopic === 'Health') {
      if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
      if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }

    if (formData.surveyTopic === 'Education') {
      if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
      if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }

    if (!formData.feedback || formData.feedback.length < 50) newErrors.feedback = 'Feedback is required and must be at least 50 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="App">
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Survey Topic:</label>
          <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <span className="error">{errors.surveyTopic}</span>}
        </div>

        {formData.surveyTopic === 'Technology' && (
          <div>
            <label>Favorite Programming Language:</label>
            <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange}>
              <option value="">Select a language</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteProgrammingLanguage && <span className="error">{errors.favoriteProgrammingLanguage}</span>}
            <div>
              <label>Years of Experience:</label>
              <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
              {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}
            </div>
          </div>
        )}

        {formData.surveyTopic === 'Health' && (
          <div>
            <label>Exercise Frequency:</label>
            <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
              <option value="">Select a frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <span className="error">{errors.exerciseFrequency}</span>}
            <div>
              <label>Diet Preference:</label>
              <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                <option value="">Select a diet</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <span className="error">{errors.dietPreference}</span>}
            </div>
          </div>
        )}

        {formData.surveyTopic === 'Education' && (
          <div>
            <label>Highest Qualification:</label>
            <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
              <option value="">Select a qualification</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.highestQualification && <span className="error">{errors.highestQualification}</span>}
            <div>
              <label>Field of Study:</label>
              <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
              {errors.fieldOfStudy && <span className="error">{errors.fieldOfStudy}</span>}
            </div>
          </div>
        )}

        <div>
          <label>Feedback:</label>
          <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
          {errors.feedback && <span className="error">{errors.feedback}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {additionalQuestions.length > 0 && (
        <div className="additional-questions">
          <h2>Additional Questions</h2>
          {additionalQuestions.map((question, index) => (
            <div key={index}>
              <label>{question}</label>
              <input type="text" name={`additionalQuestion${index}`} onChange={handleChange} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

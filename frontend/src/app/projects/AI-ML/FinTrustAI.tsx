"use client";

import React, { useState} from 'react';
// Import the new service function
import { callApi } from '@/services/apiService';

// Interface for the prediction result remains the same
interface PredictionResult {
    prediction: string;
    probability_N: number;
    probability_Y: number;
  }
  
  // Initial state for the form, now with empty or default values
  const initialFormData = {
    Gender: 'Male',
    Married: 'No',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: '',
    CoapplicantIncome: '',
    LoanAmount: '',
    Loan_Amount_Term: '360',
    Credit_History: '1.0',
    Property_Area: 'Urban',
  };
  

const FinTrustAI = () => {
    const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
// --- ADD THIS LINE FOR DEBUGGING ---
// console.log("Value from .env.local:", process.env.NEXT_PUBLIC_API_FINTRUSTAI_URL);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Convert numeric fields from string input
    const numericFields = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History'];
    const finalValue = numericFields.includes(name) ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // THIS IS THE KEY CHANGE:
      // Call the generic service with the specific project name.

      const data = await callApi('finTrustAI', {
        endpoint: '/predict',
        method: 'POST',
        body: formData,
      });
      setResult(data);

    } catch (err) {
      setError('Failed to get a prediction. Please ensure the backend server is running and check your network connection.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-light-bg flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-8">
      {/* Form Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">FintrustAI</h1>
        <p className="mt-2 text-md text-gray-600">Loan Eligibility Prediction</p>
      </div>

      {/* Loan Application Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal & Property Fields */}
          <div>
            <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select id="Gender" name="Gender" value={formData.Gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="Married" className="block text-sm font-medium text-gray-700">Married</label>
            <select id="Married" name="Married" value={formData.Married} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="Dependents" className="block text-sm font-medium text-gray-700">Dependents</label>
            <select id="Dependents" name="Dependents" value={formData.Dependents} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>
          <div>
            <label htmlFor="Education" className="block text-sm font-medium text-gray-700">Education</label>
            <select id="Education" name="Education" value={formData.Education} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>Graduate</option>
              <option>Not Graduate</option>
            </select>
          </div>
          <div>
            <label htmlFor="Self_Employed" className="block text-sm font-medium text-gray-700">Self Employed</label>
            <select id="Self_Employed" name="Self_Employed" value={formData.Self_Employed} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div>
            <label htmlFor="Property_Area" className="block text-sm font-medium text-gray-700">Property Area</label>
            <select id="Property_Area" name="Property_Area" value={formData.Property_Area} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option>Urban</option>
              <option>Semiurban</option>
              <option>Rural</option>
            </select>
          </div>

          {/* Financial Fields */}
          <div>
            <label htmlFor="ApplicantIncome" className="block text-sm font-medium text-gray-700">Applicant Income</label>
            <input type="number" name="ApplicantIncome" id="ApplicantIncome" value={formData.ApplicantIncome} onChange={handleChange} placeholder="e.g., 5800" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="CoapplicantIncome" className="block text-sm font-medium text-gray-700">Co-applicant Income</label>
            <input type="number" name="CoapplicantIncome" id="CoapplicantIncome" value={formData.CoapplicantIncome} onChange={handleChange} placeholder="e.g., 1500" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="LoanAmount" className="block text-sm font-medium text-gray-700">Loan Amount (in thousands)</label>
            <input type="number" name="LoanAmount" id="LoanAmount" value={formData.LoanAmount} onChange={handleChange} placeholder="e.g., 128" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label htmlFor="Loan_Amount_Term" className="block text-sm font-medium text-gray-700">Loan Term (Months)</label>
            <input type="number" name="Loan_Amount_Term" id="Loan_Amount_Term" value={formData.Loan_Amount_Term} onChange={handleChange} placeholder="e.g., 360" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
          </div>

          {/* Credit History (Full Width) */}
          <div className="md:col-span-2">
            <label htmlFor="Credit_History" className="block text-sm font-medium text-gray-700">Credit History Available</label>
            <select id="Credit_History" name="Credit_History" value={formData.Credit_History} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
              <option value="1.0">Yes (1.0)</option>
              <option value="0.0">No (0.0)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-indigo-300 disabled:cursor-not-allowed">
            {isLoading ? 'Analyzing...' : 'Predict Eligibility'}
          </button>
        </div>
      </form>

      {/* Error Message Display */}
      {error && (
        <div className="mt-6 text-center p-4 bg-red-100 border border-red-400 text-danger rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Prediction Result Display */}
      {result && (
        <div className="mt-8 text-center p-6 bg-gray-50 rounded-lg border">
          <h2 className="text-xl font-semibold text-primary mb-4">Prediction Result</h2>
          <div className={`text-3xl font-bold p-4 rounded-md ${result.prediction === 'Y' ? 'bg-green-100 text-success' : 'bg-red-100 text-danger'}`}>
            {result.prediction === 'Y' ? 'Loan Approved' : 'Loan Rejected'}
          </div>
          <div className="mt-4 flex justify-around text-gray-700">
            <p>Approval Probability: <span className="font-bold text-gray-900">{(result.probability_Y * 100).toFixed(2)}%</span></p>
            <p>Rejection Probability: <span className="font-bold text-gray-900">{(result.probability_N * 100).toFixed(2)}%</span></p>
          </div>
        </div>
      )}
    </div>
  </div>
    
  )
}

export default FinTrustAI
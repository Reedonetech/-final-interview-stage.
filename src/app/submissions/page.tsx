'use client';

import { useContactStore } from '@/lib/store';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const SubmissionsPage = () => {
  const { submissions } = useContactStore();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Your Submissions
          </h1>
          {submissions.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">
                You haven't submitted any message yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-medium text-gray-900">
                      {submission.subject}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {submission.fullName}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Email: {submission.email}</p>
                    <p>Phone: {submission.phoneNumber}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">{submission.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SubmissionsPage;
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function DashboardPage() {
  const router = useRouter();
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetch("/api/transcripts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTranscripts(data.transcripts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h1 className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent hidden sm:block">
                Transcription Dashboard
              </h1>
              <h1 className="ml-2 sm:ml-3 text-lg font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent sm:hidden">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => router.push("/upload")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl text-xs sm:text-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="hidden sm:inline">Upload Audio</span>
                <span className="sm:hidden">Upload</span>
              </button>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-purple-100/50">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-2 sm:p-3 shadow-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Transcripts</p>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">{transcripts.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-pink-100/50">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-2 sm:p-3 shadow-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Last Upload</p>
                  <p className="text-sm sm:text-lg font-bold bg-gradient-to-r from-pink-900 to-purple-900 bg-clip-text text-transparent">
                    {transcripts.length > 0 ? formatDate(transcripts[0].createdAt) : 'Never'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-orange-100/50 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-2 sm:p-3 shadow-lg">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-900 to-pink-900 bg-clip-text text-transparent">
                    {transcripts.filter(t => new Date(t.createdAt).getMonth() === new Date().getMonth()).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Transcripts List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100/50">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-purple-100/50">
              <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">Recent Transcripts</h2>
            </div>
            
            {loading ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-600 text-sm sm:text-base">Loading transcripts...</span>
                </div>
              </div>
            ) : transcripts.length === 0 ? (
              <div className="p-6 sm:p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-2">No transcripts yet</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Get started by uploading your first audio file for transcription.</p>
                <button
                  onClick={() => router.push("/upload")}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Upload Audio
                </button>
              </div>
            ) : (
              <div className="divide-y divide-purple-100/50">
                {transcripts.map((transcript) => (
                  <div
                    key={transcript.id}
                    className="p-4 sm:p-6 hover:bg-purple-50/50 transition-all duration-200 cursor-pointer group"
                    onClick={() => router.push(`/transcripts?id=${transcript.id}`)}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h3 className="text-xs sm:text-sm font-bold text-purple-900 mb-1 sm:mb-2 group-hover:text-purple-700 transition-colors">
                          Transcript #{transcript.id.slice(-6)}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
                          {transcript.text}
                        </p>
                      </div>
                      <div className="flex-shrink-0 sm:ml-4">
                        <div className="text-xs text-gray-500 bg-purple-100/50 px-2 sm:px-3 py-1 rounded-full inline-block">
                          {formatDate(transcript.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
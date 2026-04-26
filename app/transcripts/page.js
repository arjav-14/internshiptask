"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



export default function TranscriptPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetch("/api/transcripts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const foundTranscript = data.transcripts.find(t => t.id === id);

        if (foundTranscript) {
          setTranscript(foundTranscript);
          setText(foundTranscript.text);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, router]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    // Show success feedback
    const button = document.getElementById('copy-btn');
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('bg-green-600', 'hover:bg-green-700');
    button.classList.remove('bg-gray-600', 'hover:bg-gray-700');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-green-600', 'hover:bg-green-700');
      button.classList.add('bg-gray-600', 'hover:bg-gray-700');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-gray-600">Loading transcript...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!transcript) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Transcript Not Found</h1>
          <p className="text-gray-600 mb-4">The transcript you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center mr-2 sm:mr-4"
              >
                <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </button>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                Transcript Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-4 sm:py-6 lg:px-8">
        <div className="px-4 py-4 sm:py-6 sm:px-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-purple-100/50">
            {/* Transcript Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 drop-shadow-sm">
                    Transcript #{transcript.id.slice(-6)}
                  </h2>
                  <p className="text-white/90 backdrop-blur-sm text-sm sm:text-base">
                    Created on {formatDate(transcript.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    id="copy-btn"
                    onClick={copyToClipboard}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-2 rounded-xl hover:bg-white/30 transition-all duration-200 flex items-center border border-white/20 text-xs sm:text-sm"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">Copy Text</span>
                    <span className="sm:hidden">Copy</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Transcript Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-100/50 backdrop-blur-sm">
                  <div className="flex items-start mb-3 sm:mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">Transcribed Text</h3>
                      <p className="text-xs sm:text-sm text-gray-600">AI-powered transcription of your audio file</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 sm:mt-4">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-white/50 p-3 sm:p-4 rounded-xl border border-purple-100/30 text-sm sm:text-base">
                      {text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs sm:text-sm">Copy Transcript</span>
                </button>
                
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-gray-100 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center border border-gray-200 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-xs sm:text-sm">Back to Dashboard</span>
                </button>
              </div>

              {/* Metadata */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Transcript ID</h4>
                    <p className="text-xs sm:text-sm text-gray-900 font-mono break-all">{transcript.id}</p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Created Date</h4>
                    <p className="text-xs sm:text-sm text-gray-900">{formatDate(transcript.createdAt)}</p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Character Count</h4>
                    <p className="text-xs sm:text-sm text-gray-900">{text.length.toLocaleString()} characters</p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">Word Count</h4>
                    <p className="text-xs sm:text-sm text-gray-900">{text.split(/\s+/).filter(word => word.length > 0).length.toLocaleString()} words</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
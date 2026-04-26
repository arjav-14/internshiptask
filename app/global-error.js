"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Global Error</h2>
          <button
            onClick={() => reset()}
            className="bg-black text-white px-4 py-2"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

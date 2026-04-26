export default function Error({ statusCode, err }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Error {statusCode || 'Unknown'}</h1>
      <p>Something went wrong.</p>
    </div>
  );
}

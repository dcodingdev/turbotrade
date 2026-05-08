async function run() {
  const r1 = await fetch('http://localhost:8000/api/v1/products?page=1&limit=12', { headers: { Origin: 'http://localhost:3000' } });
  const etag = r1.headers.get('etag');
  console.log('Got ETag:', etag);
  
  const r2 = await fetch('http://localhost:8000/api/v1/products?page=1&limit=12', {
    headers: { Origin: 'http://localhost:3000', 'If-None-Match': etag }
  });
  console.log('Status 2:', r2.status);
  console.log('Headers 2:', Object.fromEntries(r2.headers.entries()));
}
run();

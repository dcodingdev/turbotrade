
async function testFetch() {
  const url = 'http://localhost:8000/api/v1/products?page=1&limit=10';
  console.log(`Fetching from: ${url}`);
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log(`Success: ${data.success}`);
    console.log(`Docs count: ${data.docs?.length || 0}`);
    if (data.docs?.length > 0) {
      console.log('First product:', data.docs[0].name);
    }
  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
}

testFetch();

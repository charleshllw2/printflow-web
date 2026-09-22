export default async function handler(request, response) {
  const keys = Object.keys(process.env).filter(k => k.toLowerCase().includes('stripe') || k.toLowerCase().includes('site'));
  const safeEnv = {};
  for (const k of keys) {
    const val = process.env[k];
    safeEnv[k] = val ? `Set (Length: ${val.length})` : 'Empty';
  }
  return response.status(200).json({ 
    message: "Debug info", 
    foundKeys: keys,
    details: safeEnv 
  });
}

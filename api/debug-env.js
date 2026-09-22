export default async function handler(request, response) {
  const keys = Object.keys(process.env).filter(k => k.startsWith('sk_'));
  return response.status(200).json({ 
    message: "Debug info", 
    foundKeysStartingWithSK: keys
  });
}

// Retired: diagnostic environment details must never be exposed publicly.
export default function handler(_request, response) {
  return response.status(404).json({ error: 'Not found.' });
}

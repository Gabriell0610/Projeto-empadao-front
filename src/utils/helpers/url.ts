export const baseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1338/api';
  if (!url) throw new Error('API base URL não definida!');
  return url;
};

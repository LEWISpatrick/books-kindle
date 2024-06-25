export const fetchAudiobooks = async () => {
    const response = await fetch('https://librivox.org/api/feed/audiobooks?format=json');
    if (!response.ok) {
      throw new Error('Failed to fetch audiobooks');
    }
    const data = await response.json();
    return data.books; // Adjust based on actual API response structure
  };
  export interface Audiobook {
    id: number;
    title: string;
    author: string;
    url_text_source: string;
  }
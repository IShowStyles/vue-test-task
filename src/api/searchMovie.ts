const apiKey = import.meta.env.VITE_API_KEY as string;
const baseUrl:string = 'https://www.omdbapi.com/?i=tt3896198';

export const searchMovies = async (title: string) => {
    const URL = `${baseUrl}&apikey=${apiKey}&t=${title}`;
    const response = await fetch(URL, {
        method: 'GET'
    });
    return await response.json();
};

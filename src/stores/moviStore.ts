import {defineStore} from 'pinia';
import {searchMovies} from "../api";
import {Movie} from "../types/movie.interface.ts";
import {IDetailsMovie} from "../types/details.interface.ts";

const KEY_STORAGE = 'movies';
const KEY_DETAILS_STORAGE = 'details_movies';

interface MovieState {
    uniqueMovies: Movie[]
    resultMovies: Movie[]
    detailsMovie: IDetailsMovie[]
    isLoading: boolean
    error: string
}

export const
    useMovieStore
        =

        defineStore(
            'movieStore',

            {
                state: (): MovieState => ({
                    uniqueMovies: [] as Movie[],
                    resultMovies: [] as Movie[],
                    detailsMovie: [] as IDetailsMovie[],
                    isLoading: false,
                    error: '',
                }),
                actions: {
                    addResultMovie(movie: Movie) {
                        this.resultMovies.push(movie);
                    },
                    addDetailsMovie(movie: IDetailsMovie) {
                        this.detailsMovie.push(movie);
                    },
                    addMovie(movie: Movie) {
                        this.uniqueMovies.push(movie);
                    },
                    clearMovies() {
                        this.uniqueMovies = [];
                    },
                    fetchMovies(title: string) {
                        this.isLoading = true;
                        this.error = '';
                        searchMovies(title)
                            .then((response) => {
                                console.log(response)
                                if (response.Response === 'True') {
                                    this.uniqueMovies = [];
                                    this.uniqueMovies.push(response)
                                } else {
                                    this.error = response.Error;
                                }
                            })
                            .catch((error) => {
                                this.error = error;
                            })
                            .finally(() => {
                                this.isLoading = false;
                            });
                    },
                    setMoviesFromLocalStorage() {
                        const storedMovies = localStorage.getItem(KEY_STORAGE) as string;
                        if (storedMovies) {
                            this.resultMovies = JSON.parse(storedMovies) || [];
                        }
                    },
                    setDetailsMovies() {
                        const storedMovies = localStorage.getItem(KEY_DETAILS_STORAGE) as string;
                        if (storedMovies) {
                            this.detailsMovie = JSON.parse(storedMovies) || [];
                        }
                    },
                    saveDetailsMovies() {
                        localStorage.setItem(KEY_DETAILS_STORAGE, JSON.stringify(this.detailsMovie));
                    },
                    saveDetailsMoviesLS(movie: IDetailsMovie) {
                        this.addDetailsMovie(movie);
                        this.saveDetailsMovies();
                    },
                    addAndSaveMovie(movie: Movie) {
                        this.addResultMovie(movie);
                        this.saveMoviesToLocalStorage();
                    },
                    saveMoviesToLocalStorage() {
                        localStorage.setItem(KEY_STORAGE, JSON.stringify(this.resultMovies));
                    },
                }
            }
        )
;

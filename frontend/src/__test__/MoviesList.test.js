import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';

import mockServer from '../__mocks__/mockServer';
import MoviesList from '../components/MoviesList';

beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test('renders the appropriate number of movie cards', async () => {
    const TITLE_OF_MOVIE = 'Blacksmith Scene';
    const MOVIE_CARD_CLASS = 'moviesListCard';
    const NUMBER_OF_MOVIES = 2;
    
    const { container } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>
    );

    await waitFor(() => screen.getByText(TITLE_OF_MOVIE));
    const movieCards = container.getElementsByClassName(MOVIE_CARD_CLASS);
    // screen.debug();
    expect(movieCards.length).toBe(NUMBER_OF_MOVIES);

    /*const movieHeaders = container.getElementsByClassName("movieListCard");
    let header = "";
    for (let i = 0; i < movieHeaders.length; i++) {
        const movieHeader = movieHeaders[i];
        header = movieHeader.textContent;
        console.log(header);
      }*/
    //screen.debug();
   

});
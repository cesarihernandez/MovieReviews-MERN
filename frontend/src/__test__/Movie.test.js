import { render } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import axios from 'axios';

import mockServer from '../__mocks__/mockServer';
import Movie from '../components/Movie';


beforeAll(() => mockServer.listen())
afterEach(() => mockServer.resetHandlers())
afterAll(() => mockServer.close())

test('renders movie title and correct number of reviews', async () => {
    const TITLE_OF_MOVIE = 'Blacksmith Scene';
    const NUMBER_OF_REVIEWS = 2;
    
    const { container } = render(
        <MemoryRouter>
            <Movie />
        </MemoryRouter>
    );


    await waitFor(() => screen.getByText(TITLE_OF_MOVIE));
    const movieReviewContainers = container.getElementsByClassName("reviewContainer");
    screen.debug();
    //console.log(movieReviewContainers);
    expect(movieReviewContainers.length).toBe(NUMBER_OF_REVIEWS);
    
});
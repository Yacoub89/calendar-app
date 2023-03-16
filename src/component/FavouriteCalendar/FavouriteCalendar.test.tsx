import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockFetch from '../mocks/mockFetch';
import FavouriteCalendar from './FavouriteCalendar';


const renderScreen = (() => {
    return (
        render(<FavouriteCalendar />)
    )

})

let fetchMock: any = undefined;

beforeEach(() =>
    fetchMock = jest.spyOn(window, 'fetch').mockImplementation(mockFetch)
);

afterEach(() => {
    jest.restoreAllMocks();
});

describe('handle date clicked and show list', () => {

    it("click a date", async () => {

        renderScreen();
        const dateCell = screen.getByRole("gridcell", { name: "15" });
        fireEvent.click(dateCell);

        expect(fetchMock).toHaveBeenCalled();

    });


    it("show list of names", async () => {

        renderScreen();
        const dateCell = screen.getByRole("gridcell", { name: "15" });
        fireEvent.click(dateCell);

        await waitFor(() => {
            expect(screen.queryByTestId("progress")).not.toBeInTheDocument();

        });

        await waitFor(() => {
            expect(screen.getByText("Birthdays on March 15", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("yacoub", { exact: false })).toBeInTheDocument();
            expect(screen.getByText("mark", { exact: false })).toBeInTheDocument();
        });

    });

    it("search a name", async () => {

        renderScreen();
        const dateCell = screen.getByRole("gridcell", { name: "15" });
        fireEvent.click(dateCell);

        await waitFor(() => {
            expect(screen.queryByTestId("progress")).not.toBeInTheDocument();

        });

        const personNameInput = screen.getByRole('textbox');
        fireEvent.change(personNameInput, { target: { value: 'yacoub' } })


        expect(screen.getByText("yacoub", { exact: false })).toBeInTheDocument();
        expect(screen.queryByText("mark", { exact: false })).not.toBeInTheDocument();

    });

    it("add name to favourite", async () => {

        renderScreen();
        const dateCell = screen.getByRole("gridcell", { name: "15" });
        fireEvent.click(dateCell);

        await waitFor(() => {
            expect(screen.queryByTestId("progress")).not.toBeInTheDocument();

        });

        await waitFor(() => {
            const listIcon = screen.getAllByTestId("icon-button")[0]
            fireEvent.click(listIcon);
        });

        expect(screen.getByText("Favourite Birthdays", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("mark", { exact: false })).toBeInTheDocument();

    });
});

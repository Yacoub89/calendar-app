import { Box, CircularProgress, Container, Grid, List, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BirthDayListItems from "./BirthDayListItems/BirthDayListItems";
import Calendar from "./Calendar/Calendar";
import FavouriteListItems from "./FavouriteListItems/FavouriteListItems";


interface Birth {
    text: string,
}
interface Result {
    births: Birth[];
}

interface FavouriteListType {
    name: string,
    isFavourite: boolean
};


const FavouriteCalendar: React.FC = () => {
    const [birthdayNames, setBirthdayNames] = useState<Birth[]>();
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [favouriteList, setFavouriteList] = useState(new Map<string, FavouriteListType[]>());
    const url = "https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births"
    //filter the birthday names
    const filteredNames = birthdayNames?.filter((name) => {
        return name.text.toLocaleLowerCase().includes(searchInput);
    })

    // get the month name by month number
    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    const handleDateChange = (date: any) => {
        let day = date?.date();
        let month = date?.month() + 1 ?? 1;

        setLoading(true);
        setSearchInput("");

        setSelectedDate(`${getMonthName(month)} ${day}`)

        fetch(`${url}/${month}/${day}`)
            .then(response => response.json())
            .then((result: Result) => { setBirthdayNames(result.births) })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }

    const searchBirthdays = (e: any) => {
        const searchString = e.target.value.toLocaleLowerCase();
        setSearchInput(searchString)

    }


    const onToggleFavourite = (birthName: string) => {
        if (!favouriteList.has(selectedDate)) {
            const newEntry = {
                name: birthName,
                isFavourite: true
            }
            setFavouriteList(new Map(favouriteList.set(selectedDate, [newEntry])));
        }
        else if (!new Map(favouriteList).get(selectedDate)?.some((entry) => entry.name === birthName)) {

            const newEntry = {
                name: birthName,
                isFavourite: true
            }
            const newValue = new Map(favouriteList).get(selectedDate)?.concat(newEntry);
            const newList = new Map(favouriteList).set(selectedDate, newValue ?? []);
            setFavouriteList(newList)
        }
        else if (new Map(favouriteList).get(selectedDate)?.some((entry) => entry.name === birthName)) {
            const entry = new Map(favouriteList).get(selectedDate)?.find((entry) => entry.name === birthName);
            const newEntry = {
                name: birthName,
                isFavourite: !entry?.isFavourite
            }
            const newValue = new Map(favouriteList).get(selectedDate)?.map((entry) => entry.name === birthName ? newEntry : entry);
            const newList = new Map(favouriteList).set(selectedDate, newValue ?? []);
            setFavouriteList(newList)
        }
    }

    const getIsFavourite = (birthName: string) => {
        if (favouriteList.has(selectedDate)) {
            return new Map(favouriteList).get(selectedDate)?.some((entry) => entry.name === birthName && entry.isFavourite) ?? false;
        }
        return false;
    }

    const renderFavouriteList = () => {
        return (

            <>
                {[...favouriteList?.keys()].length > 0 &&
                    <Typography variant="h5">
                        Favourite Birthdays
                    </Typography>
                }
                {[...favouriteList?.keys()].map((date, index) => (
                    <List key={index} dense={false}>
                        <FavouriteListItems date={date} favouriteList={favouriteList} />
                    </List>
                ))}
            </>
        )
    }

    const renderNameList = () => {
        return (
            <>
                {loading &&
                    <Container><CircularProgress data-testid="progress" /></Container>}

                {!loading && birthdayNames &&
                    <Container>
                        <Box>
                            <Typography variant="h5">
                                {`Birthdays on ${selectedDate}`}
                            </Typography>

                            <TextField value={searchInput} onChange={searchBirthdays} label="Search names" variant="standard" />
                        </Box>
                        <Box>
                            {
                                filteredNames?.map((birthday: Birth, index: number) => {
                                    return (
                                        <List dense={false} key={index}>
                                            <BirthDayListItems personality={birthday.text} isFavourite={getIsFavourite(birthday.text)} onHandleButtonClick={onToggleFavourite} />
                                        </List>
                                    )
                                })
                            }

                        </Box>
                    </Container>
                }
            </>
        )
    }

    return (

        <Container fixed>
            <Box sx={{ flexGrow: 1, maxWidth: 1000 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Calendar handleDateChange={handleDateChange} />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {renderFavouriteList()}
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            {renderNameList()}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </Container >
    )
}

export default FavouriteCalendar;
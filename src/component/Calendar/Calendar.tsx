import { Diversity1 } from "@mui/icons-material";
import { Box, CircularProgress, Container, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { MouseEventHandler, useEffect, useState } from "react";

import BirthDayItems from "../BirthDayItems/BirthDayItems";



const Calendar: React.FC = () => {
    const [birthdays, setBirthdays] = useState<any>([]);
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [filteredResults, setFilteredResults] = useState([]);
    // const map = new Map();
    const [favouriteList, setFavouriteList] = useState(new Map())



    useEffect(() => {
        const filteredBithrdays = birthdays?.births?.filter((birth: any) => birth.text.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
        setFilteredResults(filteredBithrdays)
    }, [searchInput, birthdays]);


    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', { month: 'long' });
    }

    const handleDateChange = (date: any) => {
        let day = date?.date();
        let month = date?.month() + 1 ?? 1;

        setLoading(true);

        setSelectedDate(`${getMonthName(month)} ${day}`)

        fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`)
            .then(response => response.json())
            .then(births => { setBirthdays(births) })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }

    const searchBirthdays = (e: any) => {
        setSearchInput(e.target.value)
    }

    const addToFavourite = (birthName: string, isFavourite: boolean) => {
        console.log({ isFavourite })
        if (isFavourite) {
            setFavouriteList(new Map(favouriteList.set(selectedDate, [favouriteList.get(selectedDate), birthName])))
        }
        else {

            console.log({ isFavourite, else: "else" })
            const listOfFilteredName = favouriteList.get(selectedDate).filter((name: string) => name !== birthName);
            console.log({ listOfFilteredName })

            const newFavouriteList = new Map(favouriteList)
            newFavouriteList.set(selectedDate, listOfFilteredName);
            setFavouriteList(newFavouriteList)

        }

    }

    return (

        <Container fixed>
            <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                onChange={(date) => handleDateChange(date)}
                                defaultValue={dayjs()}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h5">
                            Favourite Birthdays
                        </Typography>
                        {[...favouriteList?.keys()].map((date, index) => (
                            <List dense={false}>
                                <ListItem>
                                    <ListItemText
                                        key={index}
                                        primary={date}
                                        secondary={[...favouriteList?.get(date)].map(name => (
                                            <Typography variant="subtitle1" >
                                                {name}
                                            </Typography>

                                        ))}
                                    />
                                </ListItem>
                            </List>
                        ))}
                    </Grid>
                    <Grid container spacing={1}>

                        {loading &&
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>}

                        {!loading && filteredResults &&
                            <>
                                <Box>
                                    <Typography variant="h5">
                                        {`Birthdays on ${selectedDate}`}
                                    </Typography>

                                    <TextField value={searchInput} onChange={searchBirthdays} label="Search" variant="standard" />
                                </Box>
                                <Box>

                                    {
                                        filteredResults.map((birthday: any, index: number) => {
                                            return (
                                                <List dense={false} key={index}>
                                                    <BirthDayItems birthday={birthday} index={index} onHandleButtonClick={addToFavourite} />
                                                </List>
                                            )
                                        })
                                    }


                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>

        </Container >
    )
}

export default Calendar;
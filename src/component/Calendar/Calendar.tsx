import { Box, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
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
    const [favouriteList, setFavouriteList] = useState([])



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

    const addToFavourite = (birthName: string) => {
        setFavouriteList([...favouriteList, { date: selectedDate, name: birthName }])
    }


    return (

        <Container fixed>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                onChange={(date) => handleDateChange(date)}
                                defaultValue={dayjs()}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {console.log({ favouriteList })}
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
                                                <BirthDayItems birthday={birthday} index={index} onHandleButtonClick={addToFavourite} />
                                            )
                                        })
                                    }


                                </Box>
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}

export default Calendar;
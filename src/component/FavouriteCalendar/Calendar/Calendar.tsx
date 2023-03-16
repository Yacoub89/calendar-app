import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
    handleDateChange: (date: any) => void;
}

const Calendar: React.FC<Props> = ({ handleDateChange }) => {


    const [selectedDate, setSelectedDate] = useState(dayjs());

    const onDateSelectedChange = (date: any) => {
        handleDateChange(date);
        setSelectedDate(date);


    }
    return (
        <LocalizationProvider role="button" dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                data-testid="date-picker"
                onChange={(date) => onDateSelectedChange(date)}
                value={selectedDate}
            />
        </LocalizationProvider>
    )
}

export default Calendar;
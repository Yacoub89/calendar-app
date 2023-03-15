import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

interface Props {
    handleDateChange: (date: any) => void;
}

const Calendar: React.FC<Props> = ({ handleDateChange }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                onChange={(date) => handleDateChange(date)}
                value={dayjs()}
            />
        </LocalizationProvider>
    )
}

export default Calendar;
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { MouseEventHandler, useState } from "react";

interface Props {
    birthday: {};
    index: number;
    onHandleButtonClick: (birthName: string) => MouseEventHandler;
}

const BirthDayItems: React.FC<Props> = ({ birthday, index, onHandleButtonClick }) => {
    const [isFavourite, setIsFavourite] = useState(false)


    const onHanldeFacourite = (birthName) => {
        setIsFavourite(!isFavourite);
        onHandleButtonClick(birthName)
    }

    return (

        <List dense={false} key={index}>
            <ListItem>
                {/* <ListItemButton > */}
                <ListItemIcon style={{ cursor: "pointer" }} onClick={() => onHanldeFacourite(birthday.text)}>
                    {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
                </ListItemIcon>
                <ListItemText
                    primary={birthday.text}
                />
                {/* </ListItemButton> */}
            </ListItem>
        </List>



    )
}

export default BirthDayItems;
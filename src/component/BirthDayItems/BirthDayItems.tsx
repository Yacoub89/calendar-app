import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { MouseEventHandler, useState } from "react";

interface Props {
    birthday: {};
    index: number;
    onHandleButtonClick: (birthName: string, isFavourite: boolean) => MouseEventHandler;
}

const BirthDayItems: React.FC<Props> = ({ birthday, index, onHandleButtonClick }) => {
    const [isFavourite, setIsFavourite] = useState(false)


    const onHanldeFavourite = (birthName) => {
        setIsFavourite(!isFavourite);
        onHandleButtonClick(birthName, isFavourite)

    }

    return (

        <List dense={false} key={index}>
            <ListItem>
                {/* <ListItemButton > */}
                <ListItemIcon style={{ cursor: "pointer" }} onClick={() => onHanldeFavourite(birthday.text)}>
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
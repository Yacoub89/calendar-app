import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

interface Props {
    birthday: { text: "" };
    index: number;
    onHandleButtonClick: (birthName: string, isFavourite: boolean) => void;
}

const BirthDayItems: React.FC<Props> = ({ birthday, index, onHandleButtonClick }) => {
    const [isFavourite, setIsFavourite] = useState(false)

    const onHanldeFavourite = (birthName: string) => {
        setIsFavourite(!isFavourite);
        onHandleButtonClick(birthName, !isFavourite)
    }

    return (


        <ListItem>
            <ListItemIcon style={{ cursor: "pointer" }} onClick={() => onHanldeFavourite(birthday.text)}>
                {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
            </ListItemIcon>
            <ListItemText
                primary={birthday.text}
            />
        </ListItem>
    )
}

export default BirthDayItems;
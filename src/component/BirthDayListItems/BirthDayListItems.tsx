import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

interface Props {
    personality: string;
    onHandleButtonClick: (birthName: string) => void;
    isFavourite: boolean;
}


const BirthDayListItems: React.FC<Props> = ({ personality, onHandleButtonClick, isFavourite }) => {

    const onHanldeFavourite = (personality: string) => {
        onHandleButtonClick(personality)
    }

    return (
        <ListItem>
            <ListItemIcon style={{ cursor: "pointer" }} onClick={() => onHanldeFavourite(personality)}>
                {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
            </ListItemIcon>
            <ListItemText
                primary={personality}
            />
        </ListItem>
    )
}

export default BirthDayListItems;
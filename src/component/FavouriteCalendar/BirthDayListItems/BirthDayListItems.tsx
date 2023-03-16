import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

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
            <ListItemIcon data-testid="icon-button" style={{ cursor: "pointer" }} onClick={() => onHanldeFavourite(personality)}>
                {isFavourite ? <StarIcon color="primary" /> : <StarOutlineIcon />}
            </ListItemIcon>
            <ListItemText
                primary={personality}
            />
        </ListItem>
    )
}

export default BirthDayListItems;
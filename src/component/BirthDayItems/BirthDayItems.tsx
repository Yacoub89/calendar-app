import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface Props {
    birthday: {};
    index: number;
}

const BirthDayItems: React.FC<Props> = ({ birthday, index }) => {

    return (

        <List dense={false} key={index}>
            <ListItem>
                <ListItemButton>
                    <ListItemIcon>
                        <StarOutlineIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={birthday.text}
                    />
                </ListItemButton>
            </ListItem>
        </List>



    )
}

export default BirthDayItems;
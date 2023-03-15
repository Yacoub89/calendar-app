import { ListItem, ListItemText, Typography } from "@mui/material";

interface FavouriteListType {
    name: string,
    isFavourite: boolean
};


interface Props {
    date: string;
    favouriteList: Map<string, FavouriteListType[]>;
}


const FavouriteListItems: React.FC<Props> = ({ date, favouriteList }) => {

    return (
        <ListItem key={date}>
            <ListItemText
                primary={date}
                secondary={favouriteList?.get(date)?.map((entry: FavouriteListType) => entry.isFavourite && <Typography variant="subtitle1">{entry.name}</Typography>)}
            />
        </ListItem>
    )
}

export default FavouriteListItems;
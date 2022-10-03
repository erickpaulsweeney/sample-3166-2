import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    Chip,
    Avatar,
    Grid,
} from "@mui/material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { iso31662 } from "iso-3166";

const token =
    "pk.eyJ1IjoiYXJuYXZwdXJpIiwiYSI6ImNrZHNhb3ppYTBkNDYyeHFza3diMXZtdnkifQ.fCuBiUZ9JjgUbBlaBDvPrw";

export default function App() {
    const [places, setPlaces] = useState([]);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const searchLocation = async () => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`
        );
        const data = await response.json();
        setResults(
            data.features.filter((item) => item.place_type.includes("place"))
        );
    };

    const handleDelete = (place) => {
        const newPlaces = places.filter((item) => item !== place);
        setPlaces(newPlaces);
    };

    useEffect(() => {
        if (search.length > 0) {
            searchLocation();
        } else {
            setResults([]);
        }
        // eslint-disable-next-line
    }, [search]);

    return (
        <Container maxWidth="sm" sx={{ minHeight: "100vh" }}>
            <Box
                component="img"
                src="https://images.squarespace-cdn.com/content/v1/5bfb4b67365f02cc1a69ccc9/1560372057822-CREP9EHJBQIMCI8VN8SP/Travel+Banner.png"
                sx={{
                    width: "100%",
                    filter: "hue-rotate(140deg) brightness(125%)",
                    objectFit: "contain",
                }}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            my: "2em",
                            p: "1em",
                        }}
                    >
                        <LocationSearchingIcon
                            sx={{
                                mr: "0.5em",
                                fontSize: "2em",
                                color: "rgb(15, 38, 63)",
                                backgroundColor: "white",
                                borderRadius: "50%",
                                p: "0.1em",
                            }}
                        />
                        <TextField
                            label="Search for cities"
                            variant="standard"
                            fullWidth
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {results.length === 0 && (
                        <Typography
                            variant="subtitle2"
                            align="center"
                            sx={{ width: "100%", mb: "5em" }}
                        >
                            Type in the search box to see a few suggestions!
                        </Typography>
                    )}
                    {results.length > 0 && (
                        <List sx={{ mb: "2em" }}>
                            {results.map((item) => {
                                let text = item.place_name;
                                const region = item.place_name.split(", ")[1];
                                const data = iso31662.find(
                                    (item) => item.name === region
                                );
                                if (data) {
                                    text = `${
                                        item.place_name.split(", ")[0]
                                    }, ${data.code.split("-")[1]}`;
                                }

                                return (
                                    <ListItem
                                        key={text}
                                        sx={{
                                            backdropFilter: "invert(5%)",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            setPlaces((prev) => [
                                                ...prev,
                                                text,
                                            ]);
                                            setResults([]);
                                            setSearch("");
                                        }}
                                    >
                                        <ListItemText primary={text} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Grid>
            </Grid>

            {places.length === 0 && (
                <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{ width: "100%" }}
                >
                    Select some spots to see your bucket list!
                </Typography>
            )}
            {places.length > 0 && (
                <Grid
                    container
                    px="1em"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: "1em",
                    }}
                >
                    {places.map((item, index) => (
                        <Grid key={item + index} item xs="auto">
                            <Chip
                                avatar={
                                    <Avatar
                                        alt="item"
                                        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                                    />
                                }
                                label={item}
                                onDelete={() => handleDelete(item)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

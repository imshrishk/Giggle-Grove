import React, { useState, useEffect } from 'react';
import { Wrap, Text, Box, useMediaQuery } from "@chakra-ui/react";
import DishCard from '../components/DishCard';
import axios from 'axios';

const Restaurants = ({ setCart }) => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSmallerScreen] = useMediaQuery("(max-width:550px)");

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('https://Giggle-Grove-backend.herokuapp.com/dishes/');
                setDishes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error Fetching Dishes:', error);
            }
        };

        fetchDishes();
    }, []);

    const categorizeDishes = (restaurantName) =>
        dishes.filter((dish) => dish.rName === restaurantName);

    const renderRestaurantSection = (restaurantName, dishes) => (
        <>
            <Text
                as="h2"
                fontSize="35px"
                mt="120px"
                mb="70px"
                textAlign="center"
            >
                {restaurantName}
            </Text>
            <Wrap direction={isSmallerScreen ? "column" : "row"} justify="center">
                {dishes.map((dish) => (
                    <DishCard
                        key={dish._id}
                        rName={dish.rName}
                        dName={dish.dName}
                        dImgUrl={dish.dImgUrl}
                        dPrice={dish.dPrice}
                        setCart={setCart}
                    />
                ))}
            </Wrap>
        </>
    );

    return (
        <Box>
            {!loading && (
                <>
                    {renderRestaurantSection("Valencian paella", categorizeDishes("Valencian paella"))}
                    {renderRestaurantSection("Marzipan", categorizeDishes("Marzipan"))}
                    {renderRestaurantSection("Lasagna", categorizeDishes("Lasagna"))}
                </>
            )}
        </Box>
    );
};

export default Restaurants;
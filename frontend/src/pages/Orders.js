import React, { useState } from 'react';
import {
    Text,
    Box,
    VStack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Button,
    useColorModeValue
} from "@chakra-ui/react";

const Orders = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

    const removeFromCart = (dish) => {
        const updatedCart = cart.filter((item) => item !== dish);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    return (
        <Box mt="120px" mb="70px">
            <Text
                as="h2"
                fontSize="35px"
                mb={10}
                textAlign="center"
            >
                Orders
            </Text>
            {cart.length === 0 ? (
                <Text
                    as="h3"
                    fontSize="28px"
                    mt="120px"
                    mb="70px"
                    textAlign="center"
                >
                    Cart is empty...
                </Text>
            ) : (
                <VStack spacing={5}>
                    {cart.map((dish, index) => (
                        <Stat
                            key={index}
                            borderWidth="1px"
                            px="20px"
                            py="10px"
                            borderRadius="md"
                            bg={useColorModeValue("gray.100", "gray.700")}
                        >
                            <StatLabel fontSize="23px">{dish.dName}</StatLabel>
                            <StatNumber fontSize="25px">₹{dish.dPrice}</StatNumber>
                            <StatHelpText fontSize="20px">{dish.rName}</StatHelpText>
                            <Button
                                size="sm"
                                rounded="md"
                                colorScheme="primary"
                                bg={useColorModeValue("primary.500", "primary.700")}
                                _hover={{ bg: useColorModeValue("primary.600", "primary.600") }}
                                onClick={() => removeFromCart(dish)}
                            >
                                Remove
                            </Button>
                        </Stat>
                    ))}
                </VStack>
            )}
        </Box>
    );
};

export default Orders;
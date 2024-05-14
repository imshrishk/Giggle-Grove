import {
    Flex,
    Box,
    Image,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    WrapItem,
    useToast,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

function DishCard({ rName, dName, dPrice, dImgUrl, _id }) {
    const toast = useToast();
    const cartKey = 'cart';

    const addToCart = () => {
        const dish = { rName, dName, dPrice, dImgUrl };
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Check if the dish is already in the cart
        const isAlreadyInCart = cart.some(
            (item) => item.dName === dName && item.rName === rName
        );

        if (!isAlreadyInCart) {
            cart.push(dish);
            localStorage.setItem(cartKey, JSON.stringify(cart));

            toast({
                title: 'Added To Cart',
                description: 'You can view your orders',
                variant: 'left-accent',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Already In Cart',
                description: 'This item is already in the cart',
                variant: 'left-accent',
                status: 'info',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <WrapItem>
            <Flex
                p={6}
                w="full"
                maxW="400px"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    bg={useColorModeValue('white', 'primary.900')}
                    maxW="sm"
                    borderWidth="2px"
                    borderRadius="lg"
                    boxShadow="lg"
                    position="relative"
                >
                    <Image
                        src={dImgUrl}
                        alt={`Picture Of ${dName}`}
                        borderTopRadius="lg"
                        objectFit="cover"
                        width="100%"
                        height="250px"
                    />
                    <Box p={6}>
                        <Flex
                            mt={1}
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box
                                as="h4"
                                fontSize="2xl"
                                fontWeight="semibold"
                                lineHeight="tight"
                                isTruncated
                            >
                                {dName}
                            </Box>
                            <Tooltip
                                label="Add to cart"
                                bg="white"
                                placement="top"
                                color="gray.800"
                                fontSize="1.2em"
                            >
                                <chakra.a onClick={addToCart} display="flex">
                                    <Icon
                                        as={FiShoppingCart}
                                        h={7}
                                        w={7}
                                        alignSelf="center"
                                    />
                                </chakra.a>
                            </Tooltip>
                        </Flex>
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            mt={2}
                        >
                            <Box
                                as="h4"
                                fontSize="xl"
                                fontWeight="normal"
                                lineHeight="tight"
                                isTruncated
                            >
                                {rName}
                            </Box>
                            <Box
                                fontSize="2xl"
                                color={useColorModeValue('gray.800', 'white')}
                            >
                                <Box as="span" color="gray.600" fontSize="lg">
                                    ₹
                                </Box>
                                {dPrice}
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </WrapItem>
    );
}

export default DishCard;
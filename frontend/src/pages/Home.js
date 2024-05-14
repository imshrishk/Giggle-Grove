import { Flex, Container, Heading, Stack, Text, Button, Link, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
    return (
        <Container maxW="5xl" mt="-50px">
            <Stack
                textAlign="center"
                align="center"
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                    lineHeight="110%"
                >
                    Giggle{" "}
                    <Text as="span" color="primary.400">
                    Grove
                    </Text>
                </Heading>
                <Stack spacing={6} direction="row">
                    <Link as={RouterLink} to="/signin">
                        <Button
                            rounded="full"
                            px={6}
                            colorScheme="primary"
                            bg="primary.400"
                            _hover={{ bg: "primary.500" }}
                        >
                            Choose your Delight
                        </Button>
                    </Link>
                </Stack>
                <Flex w="full" justify="center">
                    <Image
                        src="https://i.pinimg.com/originals/4f/92/56/4f9256ddc028c534ef7ad347b97a4438.jpg"
                        alt="Illustration"
                        boxSize={{ base: "80%", md: "50%" }}
                        objectFit="contain"
                    />
                </Flex>
            </Stack>
        </Container>
    );
};

export default Home;
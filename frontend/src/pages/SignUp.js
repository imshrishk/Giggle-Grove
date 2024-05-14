import { useState } from 'react';
import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';

const SignUp = () => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = { name, email, password };
        try {
            const res = await axios.post('https://Giggle-Grove-backend.herokuapp.com/user/signup', user);
            toast({
                title: "Signed Up Successfully",
                description: "Go to the Sign In tab to log in",
                variant: "left-accent",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Error submitting signup request', err);
            toast({
                title: "Error",
                description: "There was an issue signing up. Please try again.",
                variant: "left-accent",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                <Stack align="center">
                    <Heading fontSize="4xl">Sign up for your account</Heading>
                </Stack>
                <Box
                    rounded="lg"
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow="lg"
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg="blue.400"
                                color="white"
                                _hover={{ bg: 'blue.500' }}
                                onClick={onSubmit}
                            >
                                Sign up
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SignUp;
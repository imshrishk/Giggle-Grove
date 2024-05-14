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
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = { email, password };
        try {
            const res = await axios.post('https://Giggle-Grove-backend.herokuapp.com/user/signin', user);
            localStorage.setItem('token', res.data.token);
            window.location.reload();
        } catch (err) {
            console.error('Error submitting SignIn request from frontend', err);
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
                    <Heading fontSize="4xl">Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded="lg"
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow="lg"
                    p={8}
                >
                    <Stack spacing={4}>
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
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default SignIn;
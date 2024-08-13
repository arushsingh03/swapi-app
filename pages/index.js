// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Heading, SimpleGrid, Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      setCharacters(response.data.results);
    };
    fetchCharacters();
  }, [page]);

  const toggleFavorite = (character) => {
    const updatedFavorites = favorites.includes(character)
      ? favorites.filter(fav => fav !== character)
      : [...favorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  return (
    <Container maxW="container.xl" py={5}>
      <Heading mb={5}>Star Wars Characters</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {characters.map((character) => (
          <Box
            key={character.name}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Text>{character.name}</Text>
            <Button
              size="sm"
              mt={2}
              colorScheme={favorites.includes(character) ? 'red' : 'blue'}
              onClick={() => toggleFavorite(character)}
            >
              {favorites.includes(character) ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Button
              size="sm"
              mt={2}
              ml={2}
              colorScheme="teal"
              onClick={() => router.push(`/character/${character.url.split('/').slice(-2, -1)[0]}`)}
            >
              View Details
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={5}>
        <Button onClick={() => setPage(page > 1 ? page - 1 : 1)} mr={2}>Previous</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Box>
    </Container>
  );
};

export default Home;

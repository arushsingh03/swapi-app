import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Container, Heading, List, ListItem, Text,
} from '@chakra-ui/react';

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchCharacter = async () => {
        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        setCharacter(response.data);

        const filmPromises = response.data.films.map(url => axios.get(url));
        const filmResponses = await Promise.all(filmPromises);
        setFilms(filmResponses.map(res => res.data.title));
      };
      fetchCharacter();
    }
  }, [id]);

  if (!character) return <Text>Loading...</Text>;

  return (
    <Container maxW="container.md" py={5}>
      <Button mb={5} onClick={() => router.back()}>Back</Button>
      <Heading mb={5}>{character.name}</Heading>
      <Text><strong>Height:</strong> {character.height}</Text>
      <Text><strong>Mass:</strong> {character.mass}</Text>
      <Text><strong>Hair Color:</strong> {character.hair_color}</Text>
      <Text><strong>Skin Color:</strong> {character.skin_color}</Text>
      <Text><strong>Eye Color:</strong> {character.eye_color}</Text>
      <Text><strong>Birth Year:</strong> {character.birth_year}</Text>
      <Text><strong>Gender:</strong> {character.gender}</Text>

      <Heading mt={5} size="md">Films</Heading>
      <List spacing={3}>
        {films.map(film => (
          <ListItem key={film}>{film}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default CharacterDetail;

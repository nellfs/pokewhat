import { useEffect, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';

import api, { PokeClient } from '../../services';
import { IPokemon } from '../../types/Pokemons/types';
import PokemonCard from '../Cards/PokemonCard';
import { PokemonSection, PokemonList, Background } from './List.style';
import Button from '../Button/Button';

const List = () => {
  const [allPokemons, setAllPokemons] = useState<IPokemon[]>([]);
  const [pokemonChunk, setPokemonChunk] = useState(api.api_value);
  const [onMax, setOnMax] = useState(false);
  const [loadAll, setLoadAll] = useState(false);

  const pokeClient = new PokeClient();

  const [canShowButton, setCanShowButton] = useState(false);

  const loadingFirstChunk = useRef(false);

  const getAllPokemons = async () => {
    const pokemonPromises: Promise<IPokemon>[] = [];
    const res = await fetch(pokemonChunk);
    const data = await res.json();
    setPokemonChunk(data.next);

    function createPokemonObject(result: []) {
      if (allPokemons.length >= api.api_maxvalue) {
        setOnMax(true);
        return;
      }
      result.map(async function (pokemon: IPokemon) {
        pokemonPromises.push(
          fetch(pokeClient.getPokemonUrl(pokemon.name)).then((response) =>
            response.json()
          )
        );
      });
      Promise.all(pokemonPromises).then((pokemons: IPokemon[]) => {
        pokemons.map((pokemon: IPokemon) => {
          if (pokemon.id > api.api_maxvalue) return;
          const pokemonObject: IPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            types: [
              {
                type: {
                  name: pokemon.types[0].type.name,
                },
              },
              {
                type: {
                  name: pokemon.types[1]?.type.name,
                },
              },
            ],
          };

          setAllPokemons((oldPokemons) => {
            return [...oldPokemons, pokemonObject];
          });
        });
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    if (!loadingFirstChunk.current) {
      loadingFirstChunk.current = true;
      getAllPokemons();

      setTimeout(() => {
        setCanShowButton(true);
      }, 200);
    }
  });

  return (
    <Background>
      <PokemonSection>
        <PokemonList>
          {allPokemons.map((pokemon: IPokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
            />
          ))}
        </PokemonList>
      </PokemonSection>
      <Button
        height={5}
        visible={canShowButton}
        onClick={() => {
          getAllPokemons();
          setLoadAll(true);
          setTimeout(() => {
            setCanShowButton(false);
          }, 200);
        }}
      >
        Load All
      </Button>
      <InView
        as="div"
        onChange={(inView) => {
          if (inView && !canShowButton && loadAll && !onMax) {
            getAllPokemons();
          }
        }}
      />
    </Background>
  );
};

export default List;

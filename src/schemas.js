import { Schema, arrayOf } from 'normalizr';

const gameSchema = new Schema('games', {
  idAttribute: game => game.name,
});

const schemas = {
  GAME: gameSchema,
  GAME_ARRAY: arrayOf(gameSchema),
};

export default schemas;


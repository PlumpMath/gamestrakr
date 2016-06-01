import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducers from '../src/reducers';

describe('reducer', () => {


  // it('handles SET_STATE', () => {
  //   const initialState = Map();
  //   const action = {
  //     type: 'SET_STATE',
  //     state: Map({
  //       games: List.of('Ratchet & Clank', 'Overwatch')
  //     })
  //   };
  //   const nextState = reducer(initialState, action);

  //   expect(nextState).to.equal(fromJS({
  //     games: ['Ratchet & Clank', 'Overwatch']
  //   }));
  // });

  // it('handles SET_STATE with plain JS payload', () => {
  //   const initialState = Map();
  //   const action = {
  //     type: 'SET_STATE',
  //     state: {
  //       games: ['Ratchet & Clank', 'Overwatch']
  //     }
  //   };
  //   const nextState = reducer(initialState, action);

  //   expect(nextState).to.equal(fromJS({
  //     games: ['Ratchet & Clank', 'Overwatch']
  //   }));
  // });

  // it('handles SET_STATE without initial state', () => {
  //   const action = {
  //     type: 'SET_STATE',
  //     state: {
  //       games: ['Ratchet & Clank', 'Overwatch']
  //     }
  //   };
  //   const nextState = reducer(undefined, action);

  //   expect(nextState).to.equal(fromJS({
  //     games: ['Ratchet & Clank', 'Overwatch']
  //   }));
  // });

});

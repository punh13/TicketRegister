import React from 'react';

export default function Sorting({ state, dispatch }) {
  return (
    <select
      value={state}
      onChange={(e) =>
        dispatch({ type: 'SET_SORTING', payload: e.target.value })
      }
    >
      <option value="High to Low">High to Low</option>
      <option value="Low to High">Low to High</option>
    </select>
  );
}

import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 1. Render car with color
// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

const carsWithColor = carsFromServer.map(car => {
  const colors = colorsFromServer.find(color => (
    color.id === car.colorId
  ));

  return {
    ...car,
    colors,
  };
});

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [colorId, setColorId] = useState(0);

  const lowerQuery = query.toLowerCase().trim();
  let visibleCars = [...carsWithColor];

  if (query) {
    visibleCars = visibleCars.filter(car => (
      car.brand.toLowerCase().includes(lowerQuery)
    ));
  }

  if (colorId) {
    visibleCars = visibleCars.filter(car => (
      car.colorId === colorId
    ));
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <select onChange={(event) => setColorId(+event.target.value)}>
        <option value={0}>Chose a color</option>
        {colorsFromServer.map(color => (
          <option
            key={color.id}
            value={color.id}
          >
            {color.name}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {visibleCars.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: `${car.colors?.name}` }}>{car.colors?.name}</td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

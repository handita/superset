/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import provinsi from 'file-loader!./maps/prov.json';
import kabupaten from 'file-loader!./maps/kab.json';

export const maps = {
  provinsi,
  kabupaten
};

export const mapsOptions = Object.keys(maps).map(x => {
  if (x === 'uk' || x === 'usa') {
    return [x, x.toUpperCase()];
  }
  return [x, x[0].toUpperCase() + x.slice(1)];
});

export default maps;

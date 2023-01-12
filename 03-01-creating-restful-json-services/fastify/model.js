function bicycleModel() {
  const db = {
    1: { brand: 'Veloretti', color: 'green' },
    2: { brand: 'Batavus', color: 'yellow' },
  };

  function read(id, cb) {
    // eslint-disable-next-line no-prototype-builtins
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found');
      setImmediate(() => cb(err));
      return;
    }
    setImmediate(() => cb(null, db[id]));
  }

  return {
    read,
  };
}
module.exports = {
  bicycle: bicycleModel(),
};

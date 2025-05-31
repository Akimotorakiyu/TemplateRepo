import pl from 'nodejs-polars'
const fooSeries = pl.Series('foo', [1, 2, 3])

console.log(fooSeries.sum())

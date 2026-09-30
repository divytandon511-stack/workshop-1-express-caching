let cache = {}
// "/products" - []
// "/products/1" - {}
// "/products/2" - {}

const TTL = 60 * 1000; // 1 minute in milliseconds

function cacheMiddleware(req, res, next) {
  let key = req.url;
  let entry = cache[key];

  if (entry) {
    let age = Date.now() - entry.createdAt;
    if (age < TTL) {
      res.set("X-Cache", "HIT");
      return res.json(entry.value);
    }
    // expired — remove stale entry and fall through to fetch fresh data
    delete cache[key];
  }

  next();
}

function invalidateCache() {
  // mutate in-place so all modules sharing the same reference see the cleared cache
  for (let key in cache) {
    delete cache[key];
  }
}

module.exports = { cache, cacheMiddleware, invalidateCache };

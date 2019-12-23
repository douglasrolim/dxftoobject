export const PromiseEach = function(arr, fn) { // take an array and a function
  // invalid input
  if(!Array.isArray(arr)) return Promise.reject(new Error("Non array passed to each"));
  // empty case
  if(arr.length === 0) return Promise.resolve(); 
  return arr.reduce(function(prev, cur) { 
    return prev.then(() => fn(cur))
  }, Promise.resolve());
}

export const PromiseProps = function (props) {
  return Promise.all(Object.keys(props).map(function (key) {
    // ok with val, func, prom?
    return Promise.resolve(props[key]).then(function (res) {
      var one = {};
      one[key] = res;
      return one;
  });
}))
  .then(function (arr) {
    return arr.reduce(function (memo, oneRes) {
    var key = Object.keys(oneRes)[0];
    memo[key] = oneRes[key];
    return memo;
  }, {});
 });
};
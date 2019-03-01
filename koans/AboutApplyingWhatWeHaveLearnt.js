var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];
      let hasMushrooms;

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function(dish) {
        return dish.ingredients.every(function(ingredient){
          return ingredient !== 'mushrooms';
        }) && !dish.containsNuts;
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000)
               .reduce(function(acc, curr) {
                  if (curr % 3 === 0 || curr % 5 === 0) {
                    return acc + curr;
                  }
                  return acc;
                }, 0);

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    /* chain() together map(), flatten() and reduce() */
    let ingredientCount = _(products).chain()
               .map(function(product){ return product.ingredients; })
               .flatten()
               .reduce(function(accumulator, ingredient){
                  accumulator[ingredient] = (accumulator[ingredient] || 0) + 1;
                  return accumulator;
                }, {})
               .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {
    // Use range to find all numbers less than composite number
    // Loop array backwards looking for a prime number that can be a quotient of the composite numbers

    function largestPrime(composite) {
      return _.range(0, composite)
              .filter(function(x) { return isPrime(x) && composite % x === 0; })
              .sort(function(a, b) { return (a - b); })
              .pop();
    }

    expect(largestPrime(99)).toBe(11);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    // Loop a range of all numbers between 100 and 999
      // Loop a range of all numbers bewteen 100 and 999
        // Calculate product
        // Add palindome products to an array
    // Return largest number in palindrome array
    let range = _.range(100, 1000).reverse();
    let palindromeArr = [];

    function isPalindrome(str) {
      let forward = str.toString();
      let backward = forward.split('').slice().reverse().join('');
      return forward.toLowerCase() === backward.toLowerCase();
    }

    range.forEach(function(i) {
      range.forEach(function(j){
        if (isPalindrome(i * j)){
          palindromeArr.push(i * j);
        }
      });
    });

    let max = palindromeArr.reduce(function(max, curr) {
      return Math.max(max, curr);
    });

    expect(max).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    // Create an array of all numbers in a range
    // Starting from the range max, loop while the number isn't divisible by every value in the range
    function divisibleByAll(min, max) {
      let range = _.range(min, max + 1);
      let i = max;
      let found = false;

      while (found === false) {
        if (range.every(function(x) { return i % x === 0; })) {
          return(i);
        }
        i++;
      }
    }
    expect(divisibleByAll(1,20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    // Create a range of numbers for summing and squaring
    // Calculate sum of squares
    // Calculate square of sums
    // Find difference
    function sumSquaresDifference(min, max) {

      let range = _.range(min, max + 1);

      let sumOfSquares = range.map(function(x) { return x**2; })
                              .reduce(function(sum, num) { return sum + num; });

      let squareOfSums = range.reduce(function(sum, num) {return sum + num; })**2;

      return squareOfSums - sumOfSquares;
    }
    expect(sumSquaresDifference(1,10)).toBe(2640);
  });

  it("should find the 10001st prime", function () {

  });

  function isPrime(num) {
    if (num <= 1){
      return false;
    }

    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

});

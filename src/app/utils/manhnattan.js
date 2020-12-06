const calculateSimilarity = (userPreferences, allPreferences) => {
  const result = getSimilares(userPreferences, allPreferences)
  // console.log('result manhattan:', result);
  return result;
}


const sortFunction = (a, b) => {
  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}

const manhattanSimilarity = (user1, user2) => {
  let sum = 0;
  let result;
  Object.values(user1).forEach((item, index) => {
    if (item !== '0') {
      if (index === 3) sum = sum + ((Math.abs(item - Object.values(user2)[index], 2)) * 5);
      if (index === 0) sum = sum + ((Math.abs(item - Object.values(user2)[index], 2)) * 2);
      else sum = sum + (Math.abs(item - Object.values(user2)[index], 2));
    }
  });
  if (sum > 0) result = (1 / sum);
  return result;
};

const getSimilares = (user, all) => {
  let similarity = [];
  all.forEach((element, i) => {
    similarity.push([manhattanSimilarity(user, element.preferences), element.id]);
  })
  return similarity.sort(sortFunction).reverse();
}


export { calculateSimilarity };
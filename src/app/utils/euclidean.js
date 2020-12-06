const calculateSimilarity = (userPreferences, allPreferences) => {
  const result = getSimilares(userPreferences, allPreferences)
  // console.log('result euclidean:', result);
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

const euclidiana = (user1, user2) => {
  let sum = 0;
  let result;
  Object.values(user1).forEach((item, index) => {
    if (item !== '0') {
      if (index === 3) sum = sum + ((Math.pow(item - Object.values(user2)[index], 2)) * 5);
      if (index === 0) sum = sum + ((Math.pow(item - Object.values(user2)[index], 2)) * 2);
      else sum = sum + (Math.pow(item - Object.values(user2)[index], 2));
    }
  });
  if (sum > 0) result = 1 / (1 + Math.sqrt(sum));
  return result;
};

const getSimilares = (user, all) => {
  let similarity = [];
  all.forEach((element, i) => {
    similarity.push([euclidiana(user, element.preferences), element.id]);
  })
  return similarity.sort(sortFunction).reverse();
}


export { calculateSimilarity, sortFunction };
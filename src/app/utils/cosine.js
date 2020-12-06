const calculateSimilarity = (userPreferences, allPreferences) => {
  const result = getSimilares(userPreferences, allPreferences)
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

const cosSimilarity = (user1, user2) => {
  let topSum = 0;
  let bottomResult;
  let bottomSum = 0;
  let bottomSum2 = 0;
  let result;
  Object.values(user1).forEach((item, index) => {
    if (index === 3) topSum = topSum + ((item * Object.values(user2)[index]) * 3);
    else topSum = topSum + (item * Object.values(user2)[index]);
  });
  Object.values(user1).forEach((item, index) => {
    if (index === 3) bottomSum = (bottomSum + (Math.pow(item, 2)) * 3);
    else bottomSum = bottomSum + (Math.pow(item, 2));
  });
  Object.values(user2).forEach((item, index) => {
    if (index === 3) bottomSum2 = (bottomSum2 + (Math.pow(item, 2)) * 3);
    else bottomSum2 = bottomSum2 + (Math.pow(item, 2));
  });
  bottomResult = (Math.sqrt(bottomSum) * Math.sqrt(bottomSum2));
  result = 1 - (topSum / bottomResult);
  // result = topSum / bottomResult;
  return result;
};

const getSimilares = (user, all) => {
  let similarity = [];
  all.forEach((element, i) => {
    similarity.push([cosSimilarity(user, element.preferences), element.id]);
  })
  return similarity.sort(sortFunction);
}


export { calculateSimilarity };
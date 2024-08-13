function getRank(userLevel) {
  const ranks = [
    { level: 60, rank: "Full-Stack" },
    { level: 55, rank: "Confirmed" },
    { level: 50, rank: "Junior" },
    { level: 40, rank: "Basic" },
    { level: 30, rank: "Assistant" },
    { level: 20, rank: "Apprentice" },
    { level: 10, rank: "Beginner" },
    { level: 0, rank: "Aspiring" },
  ];

  for (let i = 0; i < ranks.length; i++) {
    if (userLevel >= ranks[i].level) {
      return ranks[i].rank;
    }
  }
}

function cleanTopSkillDublicates(data) {
  const dataArray = data.data.transaction;
  const highest = {};

  dataArray.forEach((obj) => {
    if (!highest[obj.type] || obj.amount > highest[obj.type].amount) {
      highest[obj.type] = obj;
    }
  });

  const uniqueData = Object.values(highest);
  return uniqueData;
}

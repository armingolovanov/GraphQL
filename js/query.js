function getUserData() {
  displayMainPage();

  let functions = [displayProfile, displayXps]; //displayXps, displayGrades, displayAudit
  functions.forEach((func) => {
    func().catch((err) => {
      console.error(`function ${func.name}: ${err.message}`);
    });
  });
}

async function makeQuery(query) {
  const response = await fetch(
    "https://01.kood.tech/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error fetching user data");
  }
  const data = await response.json();
  return data;
}

// ----------------------------------
async function displayProfile() {
  let userObject = `{
    user{
    auditRatio
    login
    attrs
    }
}`;

  const qry = await makeQuery(userObject);
  const userData = qry.data.user[0];
  console.log("userdata", userData);
  const auditRatio = userData.auditRatio.toFixed(2);
  const attrs = userData.attrs;
  const login = userData.login;

  const {
    email,
    tel,
    lastName,
    firstName,
    personalIdentificationCode,
    addressStreet,
    addressCity,
    addressCountry,
  } = attrs;

  document.getElementById(
    "navBarWelcomeName"
  ).innerHTML = `Welcome ${firstName} ${lastName}!`;

  document.getElementById(
    "userData"
  ).innerHTML = `<div class="boxData">${login}</div>
  <div class="boxData">${personalIdentificationCode}</div>
  <div class="boxData">${email}</div>
  <div class="boxData">${tel}</div>
  <div class="boxData">${addressStreet}, ${addressCity}, ${addressCountry}</div>`;
}
// ------------------END-------------------

// ----------------------------------

async function displayXps() {
  // querying data from the transaction table
  // Filter transactions where the type field is equal to "xp" & filter transaction where object has type "project"
  // _eq = equal to | _neq = not equal to | _lt = less than | _gt = greater than | _in = in array .etc
  let xpsData = `{
    transaction(where: {type: {_eq:"xp"}, object: {type: {_eq:"project"}}}) {
    amount
    object {
      name
    }
    }
}`;

  const data = await makeQuery(xpsData);
  console.log(data);
  // Lets store Xps with each project name into an array
  // userXps -> data -> transaction -> amount + object.name
  // Processing data
  const xpData = data.data.transaction.map((item) => ({
    name: item.object.name,
    amount: (item.amount / 1000).toFixed(0), // Convert amount to kilobytes
  }));
  // Calculate total xp
  let totalXpGained = 0;
  xpData.forEach((item) => {
    totalXpGained += item.amount / 1000;
  });
  // Sort object names based on amount of xp gained -> largest to smallest
  xpData.sort((a, b) => b.amount - a.amount);
  // Display in chart
  displayXpChart(xpData);
  // console for errors
  console.log("XP DATA:", xpData);
  console.log("Total XP Amount:", totalXpGained.toFixed(2));
}

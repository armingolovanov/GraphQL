function getUserData() {
  displayMainPage();

  let functions = [displayProfile]; //displayXps, displayGrades, displayAudit
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

async function displayProfile() {
  let userQuery = `{
    user{
    auditRatio
    login
    attrs
    }
}`;

  const data = await makeQuery(userQuery);
  const userData = data.data.user[0];
  const auditRatio = userData.auditRatio.toFixed(2);
  const attrs = userData.attrs;
  const login = userData.login;

  const { email, lastName, firstName, addressCountry } = attrs;

  document.getElementById(
    "navBarWelcomeName"
  ).innerHTML = `Welcome ${firstName} ${lastName}!`;

  document.getElementById(
    "userData"
  ).innerHTML = `<div class="boxData">${firstName} ${lastName}</div>
  <div class="boxData">${personalIdentificationCode}</div>
  <div class="boxData">${email}</div>
  <div class="boxData">${tel}</div>
  <div class="boxData">${addressStreet}, ${addressCity}, ${addressCountry}</div>`;
}

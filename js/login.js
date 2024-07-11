function loginPage() {
  const user = document.querySelector(".usernameOrEmail").value;
  const pw = document.querySelector(".password").value;
  login(user, pw)
    .then(() => {
      getUserData();
      document.querySelector(".usernameOrEmail").value = "";
      document.querySelector(".password").value = "";
    })
    .catch((error) => {
      console.log(error);
      document.querySelector(".errorOnPage").textContent = error.message;
    });
}

function displayMainPage() {
  document.querySelector(".loginPage").style.display = "none";
  document.querySelector(".mainPage").style.display = "block";
}

function logOut() {
  document.querySelector(".loginPage").style.display = "flex";
  document.querySelector(".mainPage").style.display = "none";
  document.querySelector(".errorOnPage").style.textContent = "";
  localStorage.removeItem("jwt");
}

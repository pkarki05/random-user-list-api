const apiEP = "https://randomuser.me/api/?results=20";
let userList = [];
document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  const filterUser = userList.filter((item) => {
    const name = (item.name.first + "" + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });
  display(filterUser);
});
const fetchUser = async (url) => {
  try {
    //to fetch data from server, fetch()
    //
    const response = await fetch(url);
    const data = await response.json();
    userList = data.results;
    console.log(userList);
    display(userList);
  } catch (error) {
    console.log(error);
  }
};

fetchUser(apiEP);

const display = (user) => {
  let str = "";
  user.map((usr, index) => {
    console.log(usr);
    str += `<div class="card" style="width: 18rem">
        <img src="${usr.picture.large}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title"> ${usr.name.title} ${usr.name.first}</h5>
          <p class="card-text">
            <ul class="list-unstyled">
            <li><i class="fa-solid fa-phone"></i>  ${usr.cell}</li>
            <li><i class="fa-solid fa-envelope"></i> ${usr.email}</li>
            <li><i class="fa-solid fa-location-crosshairs"></i> ${usr.location.street.number} ${usr.location.street.name} ${usr.location.postcode} ${usr.location.country} </li>
          </p>
        </div>
      </div>`;
  });
  document.getElementById("list").innerHTML = str;
  document.getElementById("count").innerHTML = user.length;
};
const handleOnGenderSelect = (e) => {
  const g = e.value;
  const url = `${apiEP}&gender=${g}`;
  fetchUser(url);
  console.log(g);
};

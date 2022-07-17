var contests = {};
fetchContest();
async function fetchContest() {
  let response = await fetch("https://kontests.net/api/v1/all");
  let json = await response.json();
  contests = json;
  renderContests(json);
}

document
  .getElementById("flexSwitchCheckChecked")
  .addEventListener("change", () => {
    if (document.getElementById("flexSwitchCheckChecked").checked === true) {
      renderContests(
        contests.filter((ele) => {
          if (ele.in_24_hours === "Yes") {
            return true;
          }
        })
      );
    } else {
      renderContests(contests);
    }
  });

function renderContests(contests) {
  let allcards = "";

  for (let i = 0; i < contests.length; i++) {
    console.log(contests[i]);
    let card = createContestCard(contests[i]);
    allcards += card;
  }
  document.getElementsByClassName("contest-box")[0].innerHTML = allcards;
}

function createContestCard(contests) {
  return ` <div class="card" style="width: 15 rem;">
  <div class="card-body">
    <h5 class="card-title">${contests.name}</h5>
    <hr />
    <p class="card-text">${contests.start_time}</p>
    <p class="card-text">${contests.end_time}</p>
    <a href="${contests.url}" class="btn btn-primary"> Go to Contest </a>
  </div>
</div>`;
}

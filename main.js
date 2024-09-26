

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');



async function getUser(username) {
    try {
        const { data } = await axios(API_URL + username);
        console.log(data);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response && err.response.status == 404) {
            createErrorCard('No profile with this username');
        } else {
            createErrorCard('An error occurred');
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(API_URL + username + '/repos?sort=created');
        console.log(data);
        addReposToCard(data);
    }
    catch (err) {
        console.log(err);
        createErrorCard('Problem fetching repos');
    }
}

function createUserCard(user) {
    const CardProfile = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" class="avatar" alt="${user.name}">
        </div>
        <div class="user-info">
            <h2>${user.name ? user.name : "User no update name"}</h2>
            <p>${user.bio ? user.bio : "User not have bio"}</p>
            <ul>
                <li>${user.followers}<strong> Followers</strong></li>
                <li>${user.following}<strong> Following</strong></li>
                <li>${user.public_repos}<strong> Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>`;

    main.innerHTML = CardProfile;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos.slice(0, 10).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repos');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}

function createErrorCard(msg) {
    const CardErr = `
    <div class="card">
            <h1>${msg}</h1>
        </div>`

    main.innerHTML = CardErr;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = '';
    }

})








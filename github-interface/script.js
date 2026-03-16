const API_BASE = 'https://api.github.com/users/';
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('content');
const loaderContainer = document.getElementById('loader');
const errorMessage = document.getElementById('errorMessage');

// Profile Elements
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const bioEl = document.getElementById('bio');
const reposCount = document.getElementById('reposCount');
const followersCount = document.getElementById('followersCount');
const followingCount = document.getElementById('followingCount');
const locationEl = document.getElementById('location');
const companyEl = document.getElementById('company');
const blogEl = document.getElementById('blog');
const reposGrid = document.getElementById('reposGrid');

// Language Colors for visual appeal
const langColors = {
    JavaScript: '#f1e05a', Python: '#3572A5', Java: '#b07219',
    TypeScript: '#3178c6', C: '#555555', 'C++': '#f34b7d',
    Ruby: '#701516', CSS: '#563d7c', HTML: '#e34c26',
    PHP: '#4F5D95', Shell: '#89e051', Go: '#00ADD8',
    Rust: '#dea584', Swift: '#F05138', Kotlin: '#A97BFF',
    Dart: '#00B4AB', Vue: '#41b883', Dockerfile: '#384d54'
};

searchBtn.addEventListener('click', () => {
    const user = searchInput.value.trim();
    if(user) fetchUserData(user);
});

searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const user = searchInput.value.trim();
        if(user) fetchUserData(user);
    }
});

async function fetchUserData(username) {
    // UI Reset state to Loading
    content.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loaderContainer.innerHTML = '<div class="modern-loader"></div>';
    loaderContainer.classList.remove('hidden');
    loaderContainer.classList.add('loader-container');

    try {
        const [profileRes, reposRes] = await Promise.all([
            fetch(`${API_BASE}${username}`),
            fetch(`${API_BASE}${username}/repos?sort=updated&per_page=12`)
        ]);

        if (!profileRes.ok) {
            throw new Error(profileRes.status === 404 ? 'User not found. Please try another username.' : 'An error occurred fetching user data.');
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        updateProfile(profileData);
        updateRepos(reposData);

        // Show Content
        loaderContainer.classList.add('hidden');
        content.classList.remove('hidden');

        // Apply 3D Tilt Effect
        initTiltEffect();

    } catch (error) {
        // Show Error
        loaderContainer.classList.add('hidden');
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}

function updateProfile(data) {
    avatar.src = data.avatar_url;
    nameEl.textContent = data.name || data.login;
    usernameEl.textContent = `@${data.login}`;
    usernameEl.href = data.html_url;
    
    bioEl.textContent = data.bio || 'Developer hasn\'t set a bio yet. Exploring the git verse!';
    
    // Animate numbers
    reposCount.textContent = data.public_repos;
    followersCount.textContent = data.followers >= 1000 ? (data.followers/1000).toFixed(1) + 'k' : data.followers;
    followingCount.textContent = data.following;

    updateMeta(locationEl, data.location);
    updateMeta(companyEl, data.company);
    updateMeta(blogEl, data.blog, true);
}

function updateMeta(element, value, isLink = false) {
    if (value) {
        element.classList.remove('hidden');
        const span = element.querySelector('span');
        if (isLink) {
            const url = value.startsWith('http') ? value : 'https://' + value;
            span.innerHTML = `<a href="${url}" target="_blank">${value}</a>`;
        } else {
            span.textContent = value;
        }
    } else {
        element.classList.add('hidden');
    }
}

function updateRepos(repos) {
    reposGrid.innerHTML = '';
    
    if (repos.length === 0) {
        reposGrid.innerHTML = '<p style="color: var(--text-muted); font-size: 1.1rem; grid-column: 1/-1;">No public repositories found for this user.</p>';
        return;
    }

    repos.forEach(repo => {
        const color = langColors[repo.language] || '#00f0ff';
        
        const card = document.createElement('a');
        card.className = 'repo-card js-tilt';
        card.href = repo.html_url;
        card.target = '_blank';
        
        card.innerHTML = `
            <div class="repo-card-inner">
                <h4 class="repo-name">
                    <i class="${repo.fork ? 'fas fa-code-branch' : 'far fa-folder'}"></i>
                    ${repo.name}
                </h4>
                <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                <div class="repo-meta">
                    ${repo.language ? `<span class="repo-lang"><span class="lang-dot" style="background: ${color}; color: ${color}"></span>${repo.language}</span>` : ''}
                    <span class="repo-stars" title="Stars"><i class="far fa-star"></i>${repo.stargazers_count}</span>
                    <span class="repo-forks" title="Forks"><i class="fas fa-code-branch"></i>${repo.forks_count}</span>
                </div>
            </div>
        `;
        reposGrid.appendChild(card);
    });
}

// 3D Vanilla JS Tilt Effect
function initTiltEffect() {
    const cards = document.querySelectorAll('.js-tilt');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.6), 0 0 25px rgba(0, 240, 255, 0.2)';
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.boxShadow = 'none';
            card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.1s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
}

// Load default user showcase (from prompt instruction)
fetchUserData('2303a51831');

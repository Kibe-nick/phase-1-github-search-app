document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const searchQuery = searchInput.value.trim();
  
      if (searchQuery) {
        try {
          // Clear previous results
          userList.innerHTML = '';
          reposList.innerHTML = '';
  
          // Fetch users from GitHub
          const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
          const usersData = await usersResponse.json();
  
          // Display users
          usersData.items.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
              <div>
                <img src="${user.avatar_url}" alt="Avatar" style="width: 50px; height: 50px;">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
              </div>
            `;
            userList.appendChild(userItem);
  
            // Event listener for user item click
            userItem.addEventListener('click', async () => {
              try {
                // Fetch repositories for the selected user
                const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
                const reposData = await reposResponse.json();
  
                // Display repositories
                reposList.innerHTML = '';
                reposData.forEach(repo => {
                  const repoItem = document.createElement('li');
                  repoItem.textContent = repo.full_name;
                  reposList.appendChild(repoItem);
                });
              } catch (error) {
                console.error('Error fetching repositories:', error);
              }
            });
          });
  
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    });
  });
  
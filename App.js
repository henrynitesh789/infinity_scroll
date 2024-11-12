document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("root");
  
    let posts = [];
    let page = 1;
    let loading = false;
    let hasMore = true;
  
    const fetchPosts = async () => {
      loading = true;
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
        const data = await response.json();
  
        if (data.length > 0) {
          posts = [...posts, ...data];
          renderPosts();
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      loading = false;
    };
  
    const renderPosts = () => {
      rootElement.innerHTML = `
        <div class="App">
          <h1>Infinite Scroll Posts</h1>
          <div class="posts">
            ${posts.map(post => `
              <div key="${post.id}" class="post">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
              </div>
            `).join('')}
          </div>
          ${loading ? `<div class="loader"><div class="spinner"></div></div>` : ''}
          ${!hasMore ? `<p>No more posts to load</p>` : ''}
        </div>
      `;
    };
  
    const handleScroll = () => {
      const isScrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
      if (isScrolledToBottom && !loading && hasMore) {
        page += 1;
        fetchPosts();
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    fetchPosts();
  });
  
// Fetch the top or new posts from the Hacker News API
export const fetchPosts = async (category, page = 1, limit = 20) => {
  // The API URLs for the top and new stories
  const apiUrls = {
    top: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    new: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
  };

  //   Fetching for the top posts to start with
  try {
    const response = await fetch(apiUrls[category]);
    const storyIds = await response.json();

    // Calculate the start and end indices for the current page
    const start = (page - 1) * limit;
    const end = start + limit;

    // Fetch the details of each story using the ids (up to 100 items for now)
    const stories = await Promise.all(
      storyIds.slice(start, end).map(async (id) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );
        return await storyResponse.json();
      })
    );

    return {
      stories,
      total: storyIds.length,
    };
  } catch (error) {
    throw new Error('Failed to fetch stories.');
  }
};

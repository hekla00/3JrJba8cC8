// Finding the max item ID to determine the max number of items to fetch
export const fetchMaxItemId = async () => {
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty'
    );
    const maxItemId = await response.json();
    return maxItemId;
  } catch (error) {
    throw new Error('Failed to fetch max item ID.');
  }
};

// Fetch the top or new posts from the Hacker News API
export const fetchPosts = async () => {
  // The API URLs for the top and new stories
  const apiUrls = {
    top: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    new: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
  };

  //   Fetching for the top posts to start with
  try {
    const response = await fetch(apiUrls['top']);
    const storyIds = await response.json();

    // Fetch the details of each story using the ids (up to 100 items for now)
    const stories = await Promise.all(
      storyIds.slice(0, 100).map(async (id) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );
        return await storyResponse.json();
      })
    );

    return stories;
  } catch (error) {
    throw new Error('Failed to fetch stories.');
  }
};

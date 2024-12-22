import { fetchPosts } from './fetchPosts';

describe('fetchPosts', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  //   Mocks the fetch API to return the expected data
  test('fetches top stories and returns filtered results', async () => {
    const mockStoryIds = [1, 2, 3];
    const mockStories = [
      { id: 1, title: 'Top Story 1' },
      { id: 2, title: 'Top Story 2' },
      { id: 3, title: 'Another Story' },
    ];

    global.fetch
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockStoryIds),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockStories[0]),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockStories[1]),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(mockStories[2]),
      });

    //   Fetching top stories
    const result = await fetchPosts('top', 'Top', 1, 3);

    //  Checking if the result is as expected
    expect(result).toEqual({
      stories: [
        { id: 1, title: 'Top Story 1' },
        { id: 2, title: 'Top Story 2' },
      ],
      total: 3,
    });
    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  // Mocks the fetch API to throw an error when fetchPosts is called
  test('throws an error when fetching stories fails', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch'));

    await expect(fetchPosts('top')).rejects.toThrow('Failed to fetch stories.');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

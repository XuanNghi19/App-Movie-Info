import { LeaderboardUser } from "src/app/features/client/types/home";
import { ReviewsResponse } from "src/app/features/client/types/movie-details";

export const leaderboardUser: LeaderboardUser[] = [
  {
    username: 'hung0733',
    allTimeEdits: 35558,
    weeklyEdits: 11792,
  },
  {
    username: 'Shei',
    avatarUrl: '/assets/images/shen.webp',
    allTimeEdits: 1902922,
    weeklyEdits: 10671,
  },
  {
    username: 'janar',
    avatarUrl: '/assets/images/janar.webp',
    allTimeEdits: 418590,
    weeklyEdits: 7541,
  },
  {
    username: 'vaugouin',
    avatarUrl: '/assets/images/vau.webp',
    allTimeEdits: 463727,
    weeklyEdits: 6309,
  },
  {
    username: 'CXC6000',
    allTimeEdits: 307081,
    weeklyEdits: 4846,
  },
  {
    username: 'enterpr1se',
    avatarUrl: '/assets/images/enter.jpeg',
    allTimeEdits: 531816,
    weeklyEdits: 11063,
  },
  {
    username: 'bayramova',
    allTimeEdits: 301517,
    weeklyEdits: 9411,
  },
  {
    username: 'zoulnix',
    avatarUrl: '/assets/images/zou.webp',
    allTimeEdits: 103653,
    weeklyEdits: 6488,
  },
  {
    username: 'raze464',
    avatarUrl: '/assets/images/raz.webp',
    allTimeEdits: 1088440,
    weeklyEdits: 5064,
  },
  {
    username: 'shanetian',
    allTimeEdits: 5073,
    weeklyEdits: 4643,
  },
];

export const mockReviewsResponse: ReviewsResponse = {
  id: 123,
  page: 1,
  results: [
    {
      author: "john_doe",
      author_details: {
        name: "John Doe",
        username: "johnny123",
        avatar_path: "/assets/images/avt1.webp",
        rating: 8.5,
      },
      content: "This movie was absolutely amazing! The story, the visuals, everything was on point.",
      created_at: "2025-07-20T14:30:00Z",
      updated_at: "2025-07-20T15:00:00Z",
      id: "review1",
      url: "https://www.themoviedb.org/review/review1",
    },
    {
      author: "jane_smith",
      author_details: {
        name: "Jane Smith",
        username: "jsmith",
        avatar_path: null,
        rating: 6,
      },
      content: "The film was okay, but I felt the pacing was a bit off in the middle.",
      created_at: "2025-07-21T10:15:00Z",
      updated_at: "2025-07-21T10:45:00Z",
      id: "review2",
      url: "https://www.themoviedb.org/review/review2",
    },
    {
      author: "movie_buff",
      author_details: {
        name: "Movie Buff",
        username: "bufffan",
        avatar_path: "/assets/images/avt2.webp",
        rating: null,
      },
      content: "Didn’t enjoy it much. Could have been better.",
      created_at: "2025-07-19T08:00:00Z",
      updated_at: "2025-07-19T09:00:00Z",
      id: "review3",
      url: "https://www.themoviedb.org/review/review3",
    }
  ],
  total_pages: 1,
  total_results: 3,
};

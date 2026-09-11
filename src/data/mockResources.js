export const mockResourcesBySkill = {
  "REST API": {
    title: "REST API Architecture & HTTP Mastery",
    estimatedTime: "2-3 hours",
    difficulty: "Intermediate",
    description: "Master HTTP request verbs, status codes, authentication headers, idempotency, and asynchronous fetch handling.",
    topics: [
      { name: "HTTP Methods: GET, POST, PUT, PATCH, DELETE and Idempotency", duration: "25 min" },
      { name: "Status Code Taxonomy (2xx, 3xx, 4xx, 5xx)", duration: "20 min" },
      { name: "Bearer Token Authentication & Headers", duration: "30 min" },
      { name: "Handling Pagination, Query Parameters & Rate Limits", duration: "35 min" }
    ],
    recommendedExercises: [
      "Build a mini REST client using Fetch and handle 401 Unauthorized token refreshes.",
      "Implement a CRUD mock server using json-server and test PATCH vs PUT.",
      "Design an error-boundary handler for 500 server responses."
    ],
    quickQuiz: [
      {
        question: "Which HTTP status code signifies that a resource was not modified (useful for client caching)?",
        options: ["200 OK", "304 Not Modified", "404 Not Found", "502 Bad Gateway"],
        answer: 1
      },
      {
        question: "Is POST idempotent by HTTP standards?",
        options: ["Yes, always", "No, repeated calls can create multiple resources", "Only with HTTPS", "Yes, if query params are empty"],
        answer: 1
      }
    ]
  },
  "Python": {
    title: "Python Data Structures & Backend Foundations",
    estimatedTime: "3 hours",
    difficulty: "Intermediate",
    description: "Strengthen Python core concepts, list comprehensions, generator functions, and object-oriented architectures.",
    topics: [
      { name: "Dictionaries, Sets, and Hash Map complexities", duration: "30 min" },
      { name: "Decorators & Context Managers in Python", duration: "45 min" },
      { name: "Object Oriented Design: Inheritances & Mixins", duration: "40 min" }
    ],
    recommendedExercises: [
      "Implement custom LRU Cache using Python dictionaries.",
      "Create a custom timing decorator `@measure_execution_time`.",
      "Write unit tests with pytest testing edge-case inputs."
    ]
  },
  "React": {
    title: "Modern React Hooks & State Performance",
    estimatedTime: "2.5 hours",
    difficulty: "Advanced",
    description: "Deep dive into React 18+ concurrency, custom hooks, memory optimization, and component lifecycles.",
    topics: [
      { name: "Mastering useEffect dependencies and cleanup", duration: "30 min" },
      { name: "useCallback and useMemo for performance bottlenecks", duration: "35 min" },
      { name: "Custom Hooks for reusable business logic", duration: "45 min" }
    ],
    recommendedExercises: [
      "Refactor nested prop drilling to React Context + useReducer.",
      "Create a `useDebounce` hook for live search inputs.",
      "Optimize a list of 1,000 items with virtualization."
    ]
  }
};

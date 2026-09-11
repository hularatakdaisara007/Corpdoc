export const mockQuestionsByJob = {
  "job-1": [
    {
      id: "q1",
      skill: "React",
      type: "mcq",
      question: "Which React hook is commonly used to manage local component state across renders?",
      options: [
        { id: "a", text: "useEffect" },
        { id: "b", text: "useState" },
        { id: "c", text: "useMemo" },
        { id: "d", text: "useRef" }
      ],
      correctAnswer: "b",
      explanation: "useState is the built-in React hook for declaring and updating state variables inside functional components."
    },
    {
      id: "q2",
      skill: "JavaScript",
      type: "mcq",
      question: "What does the Array.prototype.map() method return in JavaScript?",
      options: [
        { id: "a", text: "Modifies the original array in-place without returning anything" },
        { id: "b", text: "A new array containing the results of calling a provided function on every element" },
        { id: "c", text: "The first element that matches the condition" },
        { id: "d", text: "A boolean indicating whether all items match" }
      ],
      correctAnswer: "b",
      explanation: "map() creates a brand new array populated with the results of calling a provided callback function on every element in the calling array."
    },
    {
      id: "q3",
      skill: "REST API",
      type: "mcq",
      question: "Which HTTP method is idempotent and specifically designed to retrieve representations of a resource?",
      options: [
        { id: "a", text: "POST" },
        { id: "b", text: "GET" },
        { id: "c", text: "PATCH" },
        { id: "d", text: "CONNECT" }
      ],
      correctAnswer: "b",
      explanation: "GET requests are safe, idempotent, and intended purely to retrieve data without producing side effects on the server."
    },
    {
      id: "q4",
      skill: "React",
      type: "scenario",
      question: "You receive user data from an asynchronous API and need to render a list of cards in React. Which pattern prevents memory leaks and handles loading states cleanly?",
      options: [
        { id: "a", text: "Fetch inside the component body before return statement without hooks" },
        { id: "b", text: "Trigger the API call inside useEffect with an empty dependency array and manage loading/error state with useState" },
        { id: "c", text: "Use document.getElementById inside componentDidUpdate only" },
        { id: "d", text: "Store API response directly in window.localStorage without state" }
      ],
      correctAnswer: "b",
      explanation: "Fetching inside useEffect with dependency tracking and managing useState flags (isLoading, isError, data) is the standard React async pattern."
    },
    {
      id: "q5",
      skill: "Git",
      type: "mcq",
      question: "Which Git command clones a remote repository to your local machine for the first time?",
      options: [
        { id: "a", text: "git pull <url>" },
        { id: "b", text: "git clone <url>" },
        { id: "c", text: "git checkout -b <url>" },
        { id: "d", text: "git fork <url>" }
      ],
      correctAnswer: "b",
      explanation: "git clone creates a local working copy of an existing remote repository."
    },
    {
      id: "q6",
      skill: "HTML/CSS",
      type: "mcq",
      question: "Which CSS box-model property controls the inner spacing between an element's border and its content?",
      options: [
        { id: "a", text: "margin" },
        { id: "b", text: "padding" },
        { id: "c", text: "outline" },
        { id: "d", text: "gap" }
      ],
      correctAnswer: "b",
      explanation: "Padding generates space inside an element, between its border and content area."
    },
    {
      id: "q7",
      skill: "REST API",
      type: "mcq",
      question: "What HTTP status code should a server return when a client successfully creates a new entity via POST?",
      options: [
        { id: "a", text: "200 OK" },
        { id: "b", text: "201 Created" },
        { id: "c", text: "204 No Content" },
        { id: "d", text: "301 Moved Permanently" }
      ],
      correctAnswer: "b",
      explanation: "201 Created indicates that the request has succeeded and led to the creation of a new resource."
    },
    {
      id: "q8",
      skill: "React",
      type: "mcq",
      question: "Why should you pass a unique 'key' prop when rendering lists of elements in React?",
      options: [
        { id: "a", text: "To encrypt child components for security" },
        { id: "b", text: "To help React's virtual DOM diffing algorithm identify which items have changed, been added, or removed" },
        { id: "c", text: "To automatically bind CSS styling classes" },
        { id: "d", text: "To make the component accessible for screen readers" }
      ],
      correctAnswer: "b",
      explanation: "Keys provide identity to elements in an array, enabling efficient DOM reconciliation."
    },
    {
      id: "q9",
      skill: "JavaScript",
      type: "mcq",
      question: "What is the output of `typeof null` in standard JavaScript?",
      options: [
        { id: "a", text: "'null'" },
        { id: "b", text: "'undefined'" },
        { id: "c", text: "'object'" },
        { id: "d", text: "'boolean'" }
      ],
      correctAnswer: "c",
      explanation: "typeof null returns 'object' due to a historical legacy bug from early JavaScript implementations."
    },
    {
      id: "q10",
      skill: "REST API",
      type: "scenario",
      question: "A frontend app needs to send authentication tokens with every API request. Which header is standard?",
      options: [
        { id: "a", text: "X-Secret-Passcode" },
        { id: "b", text: "Authorization: Bearer <token>" },
        { id: "c", text: "Content-Security: Approved" },
        { id: "d", text: "Set-Cookie: user_auth" }
      ],
      correctAnswer: "b",
      explanation: "The standard HTTP Authorization header using the 'Bearer' authentication scheme is standard for REST APIs."
    }
  ],
  "job-2": [
    {
      id: "bq1",
      skill: "Python",
      type: "mcq",
      question: "Which built-in Python data structure is mutable, unordered, and does not allow duplicate elements?",
      options: [
        { id: "a", text: "list" },
        { id: "b", text: "set" },
        { id: "c", text: "tuple" },
        { id: "d", text: "dictionary keys view" }
      ],
      correctAnswer: "b",
      explanation: "A set in Python is an unordered, mutable collection of unique elements."
    },
    {
      id: "bq2",
      skill: "SQL",
      type: "mcq",
      question: "Which SQL clause is used to filter records resulting from a GROUP BY aggregate operation?",
      options: [
        { id: "a", text: "WHERE" },
        { id: "b", text: "HAVING" },
        { id: "c", text: "ORDER BY" },
        { id: "d", text: "LIMIT" }
      ],
      correctAnswer: "b",
      explanation: "HAVING filters aggregated groups, whereas WHERE filters individual rows before grouping."
    },
    {
      id: "bq3",
      skill: "REST API",
      type: "mcq",
      question: "Which HTTP status code signifies that the client's request is unauthenticated?",
      options: [
        { id: "a", text: "400 Bad Request" },
        { id: "b", text: "401 Unauthorized" },
        { id: "c", text: "403 Forbidden" },
        { id: "d", text: "404 Not Found" }
      ],
      correctAnswer: "b",
      explanation: "401 Unauthorized indicates the request requires user authentication credentials."
    },
    {
      id: "bq4",
      skill: "Python",
      type: "mcq",
      question: "What does the Python `@property` decorator allow you to do?",
      options: [
        { id: "a", text: "Make a class private" },
        { id: "b", text: "Define getter/setter methods that can be accessed like regular attributes" },
        { id: "c", text: "Run the method on a separate background thread" },
        { id: "d", text: "Serialize the object to JSON automatically" }
      ],
      correctAnswer: "b",
      explanation: "@property turns a method into a getter attribute, allowing clean encapsulation."
    },
    {
      id: "bq5",
      skill: "SQL",
      type: "scenario",
      question: "To prevent SQL Injection vulnerabilities in backend applications, which technique is essential?",
      options: [
        { id: "a", text: "String concatenation of user input into raw SQL queries" },
        { id: "b", text: "Parameterized queries / Prepared statements with ORM abstraction" },
        { id: "c", text: "Base64 encoding input on the frontend" },
        { id: "d", text: "Changing table names frequently" }
      ],
      correctAnswer: "b",
      explanation: "Parameterized queries treat user input strictly as data parameters rather than executable SQL syntax."
    },
    {
      id: "bq6",
      skill: "Django",
      type: "mcq",
      question: "In Django, what file defines the database schema as Python classes?",
      options: [
        { id: "a", text: "views.py" },
        { id: "b", text: "models.py" },
        { id: "c", text: "urls.py" },
        { id: "d", text: "admin.py" }
      ],
      correctAnswer: "b",
      explanation: "Django's ORM uses models.py to declare database tables and relationships."
    },
    {
      id: "bq7",
      skill: "Git",
      type: "mcq",
      question: "Which Git command switches to an existing branch or creates and switches to a new branch with `-b`?",
      options: [
        { id: "a", text: "git checkout / git switch" },
        { id: "b", text: "git rebase" },
        { id: "c", text: "git merge" },
        { id: "d", text: "git fetch" }
      ],
      correctAnswer: "a",
      explanation: "git checkout -b <branch> or git switch -c <branch> creates and checks out the new branch."
    },
    {
      id: "bq8",
      skill: "REST API",
      type: "mcq",
      question: "Which HTTP method should be used for applying partial modifications to a resource?",
      options: [
        { id: "a", text: "PUT" },
        { id: "b", text: "PATCH" },
        { id: "c", text: "DELETE" },
        { id: "d", text: "OPTIONS" }
      ],
      correctAnswer: "b",
      explanation: "PATCH is used for partial updates, whereas PUT typically replaces the entire resource."
    },
    {
      id: "bq9",
      skill: "Python",
      type: "mcq",
      question: "What is the time complexity of looking up a key in a standard Python dictionary on average?",
      options: [
        { id: "a", text: "O(n)" },
        { id: "b", text: "O(log n)" },
        { id: "c", text: "O(1)" },
        { id: "d", text: "O(n^2)" }
      ],
      correctAnswer: "c",
      explanation: "Python dictionaries use hash tables, giving average O(1) constant time lookups."
    },
    {
      id: "bq10",
      skill: "SQL",
      type: "mcq",
      question: "Which index type is best suited for accelerating range queries (e.g., BETWEEN, <, >)?",
      options: [
        { id: "a", text: "Hash Index" },
        { id: "b", text: "B-Tree Index" },
        { id: "c", text: "Fulltext Index" },
        { id: "d", text: "Bitmap Index" }
      ],
      correctAnswer: "b",
      explanation: "B-Tree indexes maintain sorted order, making them ideal for equality and range-based queries."
    }
  ]
};

import type { Course, Lesson } from "./learning-types";

const sqlSelect: Lesson = {
  slug: "select-filter-sort",
  title: "SELECT, filter and sort like an analyst",
  minutes: 18,
  difficulty: "Beginner",
  intro:
    "Every analytics question eventually becomes a SELECT statement. This lesson turns plain-English business questions into precise, readable queries.",
  outcomes: [
    "Read a table schema and choose only the columns a question needs",
    "Filter rows with WHERE, IN, BETWEEN and pattern matching",
    "Order and limit results to answer 'top N' questions",
  ],
  theory: [
    {
      heading: "A query is a question with a shape",
      body: "SQL executes in a logical order — FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT — even though you write SELECT first. Internalising that order explains why you cannot filter on an alias in WHERE but can in ORDER BY.",
    },
    {
      heading: "Projection is a decision, not a habit",
      body: "SELECT * is fine while exploring and costly in production: it scans wider, breaks downstream contracts and hides intent. Name the columns you need and the query becomes self-documenting.",
    },
    {
      heading: "Filtering with intent",
      body: "WHERE removes rows before aggregation. Use IN for discrete sets, BETWEEN for inclusive ranges, and LIKE / ILIKE for patterns. NULL never equals anything — use IS NULL.",
    },
  ],
  diagram: {
    title: "Logical execution order",
    steps: ["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY", "LIMIT"],
  },
  examples: [
    {
      title: "Top 5 highest-value orders this quarter",
      language: "sql",
      code: [
        "SELECT order_id, customer_id, order_total, order_date",
        "FROM orders",
        "WHERE order_date BETWEEN '2026-04-01' AND '2026-06-30'",
        "  AND status = 'completed'",
        "ORDER BY order_total DESC",
        "LIMIT 5;",
      ].join("\n"),
      explanation:
        "Named columns keep the contract explicit, BETWEEN expresses the quarter inclusively, and ORDER BY + LIMIT answers the 'top N' phrasing directly.",
    },
    {
      title: "Handling missing values safely",
      language: "sql",
      code: [
        "SELECT customer_id, COALESCE(phone, 'unknown') AS phone",
        "FROM customers",
        "WHERE email IS NOT NULL;",
      ].join("\n"),
      explanation:
        "IS NOT NULL is the only correct null test, and COALESCE gives downstream dashboards a stable value instead of blanks.",
    },
  ],
  keyPoints: [
    "Written order is not execution order",
    "Name columns; avoid SELECT * outside exploration",
    "NULL comparisons need IS NULL / IS NOT NULL",
    "ORDER BY + LIMIT answers ranking questions",
  ],
  cheatsheet: [
    { term: "WHERE", meaning: "Filters rows before grouping" },
    { term: "IN (…)", meaning: "Matches any value in a discrete set" },
    { term: "BETWEEN a AND b", meaning: "Inclusive range on both ends" },
    { term: "ILIKE", meaning: "Case-insensitive pattern match (Postgres)" },
    { term: "COALESCE", meaning: "First non-null value in the list" },
  ],
  flashcards: [
    { q: "Why can't you use a SELECT alias inside WHERE?", a: "WHERE runs before SELECT in logical execution order, so the alias does not exist yet." },
    { q: "What does BETWEEN include?", a: "Both endpoints — it is inclusive." },
    { q: "How do you test for a missing value?", a: "IS NULL / IS NOT NULL, never = NULL." },
  ],
  tutor: {
    simplify: "A SELECT statement picks columns, WHERE throws away rows you don't want, and ORDER BY decides who appears first.",
    beginner: "Think of a spreadsheet. SELECT chooses which columns stay visible, WHERE hides rows, ORDER BY sorts, LIMIT keeps only the first few rows.",
    interview: "Interviewers probe logical execution order and NULL handling. Say: filters run before projection, aliases are unavailable in WHERE, and NULL comparisons always require IS NULL.",
    analogy: "It's a library request: FROM is the shelf, WHERE is the criteria you shout at the librarian, ORDER BY is how you want them stacked, LIMIT is how many you can carry.",
    realWorld: "Analysts write dozens of these daily to answer 'which customers churned last month' or 'what were the top SKUs yesterday'.",
  },
  lab: {
    language: "sql",
    instructions:
      "Return the 10 most recent completed orders above ₹5,000, showing order_id, customer_id, order_total and order_date.",
    starter: ["SELECT", "FROM orders", "-- add your filters here", ";"].join("\n"),
    solution: [
      "SELECT order_id, customer_id, order_total, order_date",
      "FROM orders",
      "WHERE status = 'completed'",
      "  AND order_total > 5000",
      "ORDER BY order_date DESC",
      "LIMIT 10;",
    ].join("\n"),
    hints: [
      "Two conditions must both hold — combine them with AND.",
      "'Most recent' means ORDER BY order_date DESC.",
      "Cap the result set with LIMIT 10.",
    ],
    tests: [
      "Returns exactly 4 columns",
      "No row has status other than 'completed'",
      "Results are sorted newest first",
    ],
    mistakes: [
      "Using ORDER BY before WHERE in the written query",
      "Comparing status = NULL instead of IS NULL",
      "Forgetting LIMIT and returning the entire table",
    ],
  },
  quiz: [
    {
      id: "q1",
      kind: "single",
      prompt: "Which clause is evaluated first in logical execution order?",
      options: ["SELECT", "FROM", "ORDER BY", "HAVING"],
      answer: 1,
      explanation: "FROM resolves the source relation before any filtering or projection happens.",
    },
    {
      id: "q2",
      kind: "multi",
      prompt: "Which statements about NULL are correct?",
      options: [
        "NULL = NULL evaluates to true",
        "IS NULL is the correct null test",
        "COALESCE returns the first non-null value",
        "COUNT(column) counts NULLs",
      ],
      answers: [1, 2],
      explanation: "NULL comparisons are unknown, IS NULL is required, and COUNT(column) skips NULLs.",
    },
    {
      id: "q3",
      kind: "code-output",
      prompt: "How many rows does this return if orders has 100 rows and 12 are completed?",
      code: "SELECT order_id FROM orders WHERE status = 'completed' LIMIT 5;",
      options: ["100", "12", "5", "0"],
      answer: 2,
      explanation: "12 rows match the filter, and LIMIT truncates the result to 5.",
    },
    {
      id: "q4",
      kind: "boolean",
      prompt: "BETWEEN '2026-01-01' AND '2026-01-31' includes both endpoint dates.",
      answer: true,
      explanation: "BETWEEN is inclusive on both sides.",
    },
  ],
  assignment: {
    title: "Quarterly revenue snapshot",
    brief:
      "Using the orders and customers tables, produce a query set that answers: top 10 customers by spend this quarter, orders with missing phone numbers, and the daily order count for the last 14 days. Document each query with the business question it answers.",
    rubric: [
      "Correct filters and inclusive date ranges",
      "Explicit column projection (no SELECT *)",
      "Safe NULL handling",
      "Each query annotated with its business question",
    ],
  },
  careerLink:
    "Interview SQL rounds for analyst and engineer roles almost always open with a filtered top-N query like this.",
};

const sqlJoins: Lesson = {
  slug: "joins-and-relationships",
  title: "Joins, relationships and the fan-out trap",
  minutes: 24,
  difficulty: "Beginner",
  intro:
    "Real answers live across tables. Joins are easy to write and easy to get subtly wrong — this lesson makes grain and cardinality explicit.",
  outcomes: [
    "Choose between INNER, LEFT, RIGHT and FULL joins deliberately",
    "Reason about grain and cardinality before writing a join",
    "Spot and fix duplicate-row fan-out in aggregations",
  ],
  theory: [
    {
      heading: "Grain first, join second",
      body: "The grain of a table is what one row means: one order, one order line, one customer per day. When you join tables of different grain, the finer grain wins and every measure from the coarser table repeats.",
    },
    {
      heading: "Join types are about row survival",
      body: "INNER keeps rows matched on both sides. LEFT keeps every row from the left and fills the right with NULLs. FULL keeps everything. Choose by asking which side must be preserved for the question to remain honest.",
    },
    {
      heading: "Fan-out and double counting",
      body: "Joining orders to order_items multiplies the order row per item. SUM(order_total) then overstates revenue. Aggregate the finer grain first in a CTE, then join back.",
    },
  ],
  diagram: {
    title: "Safe multi-grain aggregation",
    steps: ["Identify grain of each table", "Aggregate fine grain in a CTE", "Join on the shared key", "Aggregate at the reporting grain"],
  },
  examples: [
    {
      title: "LEFT JOIN keeps customers with no orders",
      language: "sql",
      code: [
        "SELECT c.customer_id, c.name, COUNT(o.order_id) AS order_count",
        "FROM customers c",
        "LEFT JOIN orders o ON o.customer_id = c.customer_id",
        "GROUP BY c.customer_id, c.name;",
      ].join("\n"),
      explanation:
        "COUNT(o.order_id) counts non-null matches, so never-ordered customers correctly show 0 instead of disappearing.",
    },
    {
      title: "Avoiding fan-out with a pre-aggregation CTE",
      language: "sql",
      code: [
        "WITH item_totals AS (",
        "  SELECT order_id, SUM(quantity * unit_price) AS items_value",
        "  FROM order_items",
        "  GROUP BY order_id",
        ")",
        "SELECT o.order_id, o.order_total, i.items_value",
        "FROM orders o",
        "JOIN item_totals i ON i.order_id = o.order_id;",
      ].join("\n"),
      explanation:
        "The CTE collapses order_items back to one row per order, so the join is 1:1 and no measure is duplicated.",
    },
  ],
  keyPoints: [
    "State the grain of every table before joining",
    "LEFT JOIN preserves the question's subject",
    "COUNT(*) after a LEFT JOIN over-counts; count the joined key instead",
    "Pre-aggregate the finer grain to prevent fan-out",
  ],
  cheatsheet: [
    { term: "INNER JOIN", meaning: "Only matched rows on both sides" },
    { term: "LEFT JOIN", meaning: "All left rows, NULLs where unmatched" },
    { term: "Grain", meaning: "What a single row represents" },
    { term: "Fan-out", meaning: "Row multiplication from a 1:many join" },
    { term: "CTE", meaning: "Named subquery via WITH, improves readability" },
  ],
  flashcards: [
    { q: "Why is COUNT(*) risky after a LEFT JOIN?", a: "Unmatched rows still exist with NULLs, so COUNT(*) returns 1 instead of 0. Count the joined key." },
    { q: "What causes double-counted revenue?", a: "Joining a coarser-grain measure to a finer-grain table before aggregating." },
  ],
  tutor: {
    simplify: "A join glues rows together on a shared key. The danger is when one side has many matches — your numbers silently multiply.",
    beginner: "Imagine two lists of index cards. INNER keeps only cards that have a partner. LEFT keeps every card in your left hand even if no partner exists.",
    interview: "Say the words 'grain' and 'cardinality'. Explain how you would verify a join with a row-count check before and after, and how a CTE prevents fan-out.",
    analogy: "It's a wedding seating chart: INNER seats only couples who both showed up, LEFT seats everyone on your guest list regardless.",
    realWorld: "Almost every revenue-reporting bug in production traces back to a fan-out join nobody checked.",
  },
  lab: {
    language: "sql",
    instructions:
      "Return every customer with their total completed revenue, including customers who have never ordered (they should show 0).",
    starter: [
      "SELECT c.customer_id, c.name",
      "FROM customers c",
      "-- join orders and aggregate",
      ";",
    ].join("\n"),
    solution: [
      "SELECT c.customer_id, c.name,",
      "       COALESCE(SUM(o.order_total) FILTER (WHERE o.status = 'completed'), 0) AS revenue",
      "FROM customers c",
      "LEFT JOIN orders o ON o.customer_id = c.customer_id",
      "GROUP BY c.customer_id, c.name",
      "ORDER BY revenue DESC;",
    ].join("\n"),
    hints: [
      "Never-ordered customers must survive — that means LEFT JOIN.",
      "SUM over no rows returns NULL; wrap it in COALESCE.",
      "Filter status inside the aggregate, not in WHERE, or you will drop the zero-revenue customers.",
    ],
    tests: [
      "Every customer appears exactly once",
      "Customers without orders show revenue = 0",
      "Cancelled orders are excluded from revenue",
    ],
    mistakes: [
      "Putting status = 'completed' in WHERE, which converts the LEFT JOIN into an INNER JOIN",
      "Leaving SUM as NULL instead of 0",
      "Grouping by name only, merging distinct customers",
    ],
  },
  quiz: [
    {
      id: "q1",
      kind: "single",
      prompt: "You LEFT JOIN orders to customers and add WHERE orders.status = 'completed'. What happens?",
      options: [
        "Nothing changes",
        "It behaves like an INNER JOIN and drops customers without completed orders",
        "It throws a syntax error",
        "It duplicates every customer row",
      ],
      answer: 1,
      explanation: "The WHERE clause removes NULL-filled rows, effectively converting the join to INNER.",
    },
    {
      id: "q2",
      kind: "boolean",
      prompt: "Joining orders (1 row per order) to order_items (many rows per order) can inflate SUM(order_total).",
      answer: true,
      explanation: "That is textbook fan-out — the order measure repeats once per item.",
    },
    {
      id: "q3",
      kind: "multi",
      prompt: "Which techniques prevent double counting?",
      options: [
        "Pre-aggregate the finer grain in a CTE",
        "Use SELECT DISTINCT on everything",
        "Aggregate measures at their native grain then join",
        "Add LIMIT to the query",
      ],
      answers: [0, 2],
      explanation: "DISTINCT masks the symptom; LIMIT is unrelated. Fix the grain.",
    },
  ],
  assignment: {
    title: "Customer revenue model without double counting",
    brief:
      "Build a query that reports revenue, order count and item count per customer for the last 90 days. Prove with row counts that no fan-out occurred, and document your grain decisions.",
    rubric: [
      "Correct join types for the question asked",
      "No inflated measures (verified with counts)",
      "Zero-order customers preserved",
      "Grain reasoning documented",
    ],
  },
  careerLink:
    "Analytics engineering interviews frequently hand you a broken revenue query — this is the bug you are expected to find.",
};

const sqlWindows: Lesson = {
  slug: "window-functions",
  title: "Window functions: ranking, running totals and cohorts",
  minutes: 28,
  difficulty: "Intermediate",
  intro:
    "Window functions let you compute across rows without collapsing them. They are the single biggest jump in analyst SQL capability.",
  outcomes: [
    "Use OVER, PARTITION BY and ORDER BY to define a window",
    "Apply ROW_NUMBER, RANK and DENSE_RANK correctly",
    "Build running totals, moving averages and period-over-period deltas",
  ],
  theory: [
    {
      heading: "Aggregate without collapsing",
      body: "GROUP BY reduces rows. A window function keeps every row and attaches a computed value derived from a defined set of neighbouring rows — the window.",
    },
    {
      heading: "PARTITION BY is 'group by, for this calculation only'",
      body: "PARTITION BY resets the calculation per group. ORDER BY inside OVER defines the sequence used by ranking and running calculations.",
    },
    {
      heading: "Frames control the running window",
      body: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW gives a 7-day moving average. Without a frame, an ordered window defaults to a running total from the partition start.",
    },
  ],
  diagram: {
    title: "Anatomy of a window",
    steps: ["function()", "OVER (", "PARTITION BY group", "ORDER BY sequence", "ROWS BETWEEN frame )"],
  },
  examples: [
    {
      title: "Top order per customer",
      language: "sql",
      code: [
        "WITH ranked AS (",
        "  SELECT o.*,",
        "         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_total DESC) AS rn",
        "  FROM orders o",
        ")",
        "SELECT * FROM ranked WHERE rn = 1;",
      ].join("\n"),
      explanation: "ROW_NUMBER gives a deterministic single winner per customer — the standard 'latest/largest per group' pattern.",
    },
    {
      title: "7-day moving average of daily revenue",
      language: "sql",
      code: [
        "SELECT order_date,",
        "       SUM(order_total) AS daily_revenue,",
        "       AVG(SUM(order_total)) OVER (",
        "         ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW",
        "       ) AS revenue_7d_avg",
        "FROM orders",
        "GROUP BY order_date",
        "ORDER BY order_date;",
      ].join("\n"),
      explanation: "Window functions run after GROUP BY, so you can window over an aggregate directly.",
    },
  ],
  keyPoints: [
    "Windows preserve rows; GROUP BY collapses them",
    "ROW_NUMBER is deterministic, RANK leaves gaps, DENSE_RANK does not",
    "Frames define running vs moving calculations",
    "Window functions execute after WHERE and GROUP BY",
  ],
  cheatsheet: [
    { term: "ROW_NUMBER()", meaning: "1,2,3 — no ties" },
    { term: "RANK()", meaning: "1,1,3 — ties share, gaps follow" },
    { term: "DENSE_RANK()", meaning: "1,1,2 — ties share, no gaps" },
    { term: "LAG/LEAD", meaning: "Previous / next row value" },
    { term: "ROWS BETWEEN", meaning: "Explicit frame definition" },
  ],
  flashcards: [
    { q: "Difference between RANK and DENSE_RANK?", a: "RANK leaves gaps after ties; DENSE_RANK does not." },
    { q: "Can you filter on a window function in WHERE?", a: "No — windows run after WHERE. Wrap the query in a CTE and filter outside." },
    { q: "How do you get month-over-month growth?", a: "LAG(metric) OVER (ORDER BY month) and compare to the current value." },
  ],
  tutor: {
    simplify: "A window function looks sideways at nearby rows and writes the answer next to each row, instead of squashing them together.",
    beginner: "Picture a spreadsheet where each row gets a helper column that peeks at rows above or below it — that's what OVER does.",
    interview: "Expect 'second highest salary per department'. Answer with ROW_NUMBER/DENSE_RANK in a CTE, then explain why filtering must happen outside the window.",
    analogy: "Like a runner checking their split against the other runners in their own lane group, without leaving the race.",
    realWorld: "Retention curves, running revenue, session sequencing and leaderboards are all window functions.",
  },
  lab: {
    language: "sql",
    instructions:
      "For each customer, return their second-highest completed order. Exclude customers with fewer than two completed orders.",
    starter: [
      "WITH ranked AS (",
      "  -- add ROW_NUMBER here",
      "  SELECT * FROM orders",
      ")",
      "SELECT * FROM ranked;",
    ].join("\n"),
    solution: [
      "WITH ranked AS (",
      "  SELECT order_id, customer_id, order_total,",
      "         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_total DESC) AS rn",
      "  FROM orders",
      "  WHERE status = 'completed'",
      ")",
      "SELECT order_id, customer_id, order_total",
      "FROM ranked",
      "WHERE rn = 2;",
    ].join("\n"),
    hints: [
      "Filter status inside the CTE so ranking only sees completed orders.",
      "PARTITION BY customer_id restarts numbering per customer.",
      "Filter rn = 2 outside the CTE.",
    ],
    tests: [
      "At most one row per customer",
      "Customers with a single completed order are absent",
      "Ranking ignores cancelled orders",
    ],
    mistakes: [
      "Trying WHERE ROW_NUMBER() = 2 directly",
      "Forgetting PARTITION BY and ranking globally",
      "Using RANK where ties would return two rows",
    ],
  },
  quiz: [
    {
      id: "q1",
      kind: "single",
      prompt: "Which function produces 1, 1, 2 for values 100, 100, 90?",
      options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE(3)"],
      answer: 2,
      explanation: "DENSE_RANK shares ties without leaving a gap.",
    },
    {
      id: "q2",
      kind: "boolean",
      prompt: "You can reference a window function inside the WHERE clause of the same query.",
      answer: false,
      explanation: "Windows are computed after WHERE; wrap the query in a CTE or subquery first.",
    },
    {
      id: "q3",
      kind: "single",
      prompt: "Which frame gives a 7-day moving average?",
      options: [
        "ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW",
        "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW",
        "ROWS BETWEEN CURRENT ROW AND 7 FOLLOWING",
        "No frame is required",
      ],
      answer: 1,
      explanation: "Six preceding rows plus the current row equals a seven-day window.",
    },
  ],
  assignment: {
    title: "Retention and momentum report",
    brief:
      "Produce a query that returns, per month: revenue, 3-month moving average, month-over-month growth %, and each customer's order sequence number. Explain which window frame you chose and why.",
    rubric: [
      "Correct partitioning and ordering",
      "Appropriate frame for each metric",
      "Growth calculation handles the first month gracefully",
      "Written justification of window choices",
    ],
  },
  careerLink:
    "Window functions appear in nearly every senior analyst and analytics engineer SQL screen.",
};

const pyPandas: Lesson = {
  slug: "pandas-dataframes",
  title: "Pandas DataFrames: load, inspect, reshape",
  minutes: 22,
  difficulty: "Beginner",
  intro:
    "Pandas is where most analysis actually happens. This lesson builds the reflexes: load, inspect, clean, and reshape before you plot anything.",
  outcomes: [
    "Load data and inspect shape, dtypes and missing values",
    "Select rows and columns with loc and iloc confidently",
    "Group, aggregate and reshape with groupby and pivot_table",
  ],
  theory: [
    {
      heading: "A DataFrame is a labelled, typed table",
      body: "Every column has a dtype and every row has an index label. Most confusing Pandas bugs are dtype problems (object columns hiding numbers) or index misalignment during arithmetic.",
    },
    {
      heading: "loc is label-based, iloc is position-based",
      body: "df.loc[rows, cols] selects by label and is inclusive on slices. df.iloc uses integer positions and is exclusive on the end. Mixing them is the most common beginner error.",
    },
    {
      heading: "Split-apply-combine",
      body: "groupby splits rows into groups, applies an aggregation, and combines the results. agg with a dict computes several metrics at once and keeps the output tidy.",
    },
  ],
  diagram: {
    title: "Analysis reflex loop",
    steps: ["read_csv", "info / describe", "clean dtypes & nulls", "groupby / pivot", "validate", "visualise"],
  },
  examples: [
    {
      title: "Inspect before you trust",
      language: "python",
      code: [
        "import pandas as pd",
        "",
        "orders = pd.read_csv('orders.csv', parse_dates=['order_date'])",
        "print(orders.shape)",
        "print(orders.dtypes)",
        "print(orders.isna().sum())",
      ].join("\n"),
      explanation: "Shape, dtypes and null counts answer 'can I trust this file?' in three lines before any analysis.",
    },
    {
      title: "Grouped metrics in one pass",
      language: "python",
      code: [
        "summary = (orders",
        "    .query(\"status == 'completed'\")",
        "    .groupby('customer_id')",
        "    .agg(revenue=('order_total', 'sum'),",
        "         orders=('order_id', 'count'),",
        "         last_order=('order_date', 'max'))",
        "    .sort_values('revenue', ascending=False))",
      ].join("\n"),
      explanation: "Named aggregation produces readable column names and avoids multi-level column headaches.",
    },
  ],
  keyPoints: [
    "Always inspect dtypes and nulls first",
    "loc = labels (inclusive), iloc = positions (exclusive)",
    "Named aggregation keeps groupby output tidy",
    "Chained methods read top-to-bottom like a pipeline",
  ],
  cheatsheet: [
    { term: "df.info()", meaning: "Dtypes, non-null counts, memory" },
    { term: "df.loc[]", meaning: "Label-based selection" },
    { term: "df.iloc[]", meaning: "Position-based selection" },
    { term: "groupby().agg()", meaning: "Split-apply-combine with named metrics" },
    { term: "pivot_table", meaning: "Reshape long data into a matrix" },
  ],
  flashcards: [
    { q: "Is df.loc['a':'c'] inclusive of 'c'?", a: "Yes — label slices are inclusive on both ends." },
    { q: "Why is a numeric column showing dtype object?", a: "Non-numeric characters (commas, currency symbols, blanks) prevented type inference." },
  ],
  tutor: {
    simplify: "A DataFrame is a spreadsheet you control with code. Inspect it, clean it, group it, then chart it.",
    beginner: "Think of Excel with named tabs and formulas replaced by short lines of Python that you can rerun any time.",
    interview: "Be ready to explain loc vs iloc, how you detect data quality issues, and why chained assignment triggers a SettingWithCopyWarning.",
    analogy: "Cooking prep: inspect ingredients, wash and chop (clean), portion by dish (groupby), then plate it (visualise).",
    realWorld: "Every EDA notebook in a real analytics team starts with exactly this sequence.",
  },
  lab: {
    language: "python",
    instructions:
      "From orders.csv, compute revenue per customer for completed orders only, keep the top 10, and add a share-of-total column.",
    starter: [
      "import pandas as pd",
      "",
      "orders = pd.read_csv('orders.csv', parse_dates=['order_date'])",
      "# your code here",
    ].join("\n"),
    solution: [
      "import pandas as pd",
      "",
      "orders = pd.read_csv('orders.csv', parse_dates=['order_date'])",
      "completed = orders[orders['status'] == 'completed']",
      "revenue = (completed",
      "    .groupby('customer_id', as_index=False)['order_total']",
      "    .sum()",
      "    .rename(columns={'order_total': 'revenue'})",
      "    .sort_values('revenue', ascending=False))",
      "revenue['share'] = revenue['revenue'] / revenue['revenue'].sum()",
      "top10 = revenue.head(10)",
    ].join("\n"),
    hints: [
      "Filter before grouping so cancelled orders never enter the sum.",
      "as_index=False keeps customer_id as a normal column.",
      "Compute the share against the full total, not the top-10 total.",
    ],
    tests: [
      "Result has exactly 10 rows",
      "share column sums to less than or equal to 1",
      "Cancelled orders excluded",
    ],
    mistakes: [
      "Computing share after slicing to the top 10",
      "Chained assignment triggering SettingWithCopyWarning",
      "Forgetting parse_dates and comparing strings to dates",
    ],
  },
  quiz: [
    {
      id: "q1",
      kind: "single",
      prompt: "Which selector is position-based?",
      options: ["df.loc", "df.iloc", "df.at", "df.query"],
      answer: 1,
      explanation: "iloc uses integer positions; loc and at use labels.",
    },
    {
      id: "q2",
      kind: "boolean",
      prompt: "df.loc['a':'c'] excludes the row labelled 'c'.",
      answer: false,
      explanation: "Label-based slicing is inclusive of the endpoint.",
    },
    {
      id: "q3",
      kind: "multi",
      prompt: "Which checks belong in a first-pass inspection?",
      options: ["df.shape", "df.dtypes", "df.isna().sum()", "df.to_csv()"],
      answers: [0, 1, 2],
      explanation: "Writing the file out is not an inspection step.",
    },
  ],
  assignment: {
    title: "Exploratory analysis notebook",
    brief:
      "Produce a notebook that loads the orders dataset, documents data quality issues found, computes three business metrics, and ends with a short written recommendation for the business.",
    rubric: [
      "Documented data quality findings",
      "Correct, reproducible metric calculations",
      "Readable chained transformations",
      "A recommendation grounded in the numbers",
    ],
  },
  careerLink:
    "This notebook structure is exactly what hiring managers expect to see in a portfolio repository.",
};

const pyViz: Lesson = {
  slug: "visual-storytelling",
  title: "From chart to decision: visual storytelling",
  minutes: 20,
  difficulty: "Beginner",
  intro:
    "A chart that needs explaining has already failed. This lesson covers choosing encodings and framing a finding as a decision.",
  outcomes: [
    "Match chart type to the question being asked",
    "Remove chart junk and highlight the single message",
    "Write a finding as a recommendation, not an observation",
  ],
  theory: [
    {
      heading: "The question picks the chart",
      body: "Comparison over time → line. Composition → stacked bar or treemap. Distribution → histogram or box plot. Relationship → scatter. Ranking → sorted bar. Pie charts almost never win.",
    },
    {
      heading: "One message per chart",
      body: "Give the chart a sentence title stating the finding ('Repeat customers drive 62% of revenue'), then strip everything that does not support it.",
    },
    {
      heading: "Finding → so what → now what",
      body: "Executives buy decisions, not descriptions. Every insight should end with a recommended action and the expected impact.",
    },
  ],
  diagram: {
    title: "Insight structure",
    steps: ["Finding", "Evidence", "So what", "Recommended action", "Expected impact"],
  },
  examples: [
    {
      title: "Sentence-title chart",
      language: "python",
      code: [
        "ax = monthly.plot(x='month', y='revenue', legend=False)",
        "ax.set_title('Revenue growth stalled after March')",
        "ax.set_ylabel('')",
        "ax.spines[['top', 'right']].set_visible(False)",
      ].join("\n"),
      explanation: "The title carries the message; removing spines and redundant labels reduces noise.",
    },
  ],
  keyPoints: [
    "Sort bars by value, never alphabetically by accident",
    "Sentence titles beat noun titles",
    "Colour is a signal, not decoration",
    "Every insight ends with an action",
  ],
  cheatsheet: [
    { term: "Trend", meaning: "Line chart, time on x-axis" },
    { term: "Ranking", meaning: "Horizontal sorted bar" },
    { term: "Distribution", meaning: "Histogram / box plot" },
    { term: "Relationship", meaning: "Scatter with trendline" },
  ],
  flashcards: [
    { q: "What makes a good chart title?", a: "A full sentence stating the finding, not a description of the axes." },
    { q: "When is a pie chart acceptable?", a: "Rarely — only for two or three parts of a clear whole." },
  ],
  tutor: {
    simplify: "Pick the chart that answers the question, write the answer in the title, delete the rest.",
    beginner: "If someone reading your chart for five seconds cannot repeat your point back to you, simplify it.",
    interview: "Dashboard walkthroughs test narrative. Present finding, evidence, recommendation — in that order, in under two minutes.",
    analogy: "A chart is a headline, not the whole newspaper.",
    realWorld: "Stakeholder reviews reward the analyst who arrives with a recommendation, not just a dashboard link.",
  },
  quiz: [
    {
      id: "q1",
      kind: "single",
      prompt: "Which chart best shows revenue trend across 24 months?",
      options: ["Pie chart", "Line chart", "Scatter plot", "Treemap"],
      answer: 1,
      explanation: "Continuous time series belong on a line chart.",
    },
    {
      id: "q2",
      kind: "boolean",
      prompt: "A chart title should describe the axes rather than the finding.",
      answer: false,
      explanation: "Sentence titles that state the finding communicate far faster.",
    },
  ],
  assignment: {
    title: "One-slide executive insight",
    brief:
      "Take a metric from your previous notebook and produce a single slide: sentence title, one chart, three bullets (finding, so what, now what).",
    rubric: [
      "Chart type matches the question",
      "Sentence title states the finding",
      "Recommendation with expected impact",
      "No chart junk",
    ],
  },
  careerLink:
    "Final-round analyst interviews are usually a presentation round — this is the exact format they score.",
};

export const COURSES: Course[] = [
  {
    slug: "sql-for-data",
    title: "SQL for Data Work",
    subtitle: "From first SELECT to window functions used in production analytics.",
    level: "Beginner",
    hours: 14,
    pathSlugs: ["data-analyst", "data-engineer", "analytics-engineer", "career-switcher"],
    overview:
      "The SQL course built the way interviews and real teams actually use it: query shape, grain discipline, and the analytical patterns that carry you from reporting to modelling.",
    objectives: [
      "Write correct, readable queries against relational data",
      "Reason about grain and cardinality before joining",
      "Apply window functions to ranking, retention and momentum questions",
      "Defend your query choices in an interview setting",
    ],
    prerequisites: ["Comfort with spreadsheets", "No prior programming required"],
    modules: [
      {
        slug: "query-foundations",
        title: "Query foundations",
        summary: "Turn business questions into precise, readable SQL.",
        difficulty: "Beginner",
        objectives: ["Understand logical execution order", "Filter and sort with intent", "Handle NULLs safely"],
        lessons: [sqlSelect],
      },
      {
        slug: "relationships",
        title: "Relationships and grain",
        summary: "Join tables without silently corrupting your numbers.",
        difficulty: "Beginner",
        objectives: ["Choose join types deliberately", "Detect fan-out", "Aggregate at the correct grain"],
        lessons: [sqlJoins],
      },
      {
        slug: "analytical-sql",
        title: "Analytical SQL",
        summary: "Ranking, running totals and cohort analysis with window functions.",
        difficulty: "Intermediate",
        objectives: ["Define windows precisely", "Rank correctly", "Build moving and period-over-period metrics"],
        lessons: [sqlWindows],
      },
    ],
    capstone: {
      title: "Revenue intelligence warehouse query pack",
      problem:
        "A D2C retailer cannot agree on revenue numbers: three teams report three totals for the same month.",
      requirements: [
        "Single source-of-truth revenue definition",
        "Customer, product and monthly reporting views",
        "Documented grain and join reasoning",
        "Data quality checks that fail loudly",
      ],
      dataset: "Synthetic D2C retail dataset — customers, orders, order_items, refunds (≈250k rows).",
      architecture: ["Raw tables", "Staging views", "Fact & dimension models", "Reporting views", "Quality tests"],
      deliverables: ["Query pack repository", "README with metric definitions", "Data quality report", "Five-minute walkthrough"],
      resumeBullets: [
        "Standardised conflicting revenue definitions into a single tested reporting layer across 250k+ order rows",
        "Eliminated double-counted revenue caused by multi-grain joins and documented the metric contract",
      ],
    },
    interviewQuestions: [
      { q: "Explain the logical execution order of a SQL query.", a: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. It explains alias availability and why filters run before projection." },
      { q: "How do you find the second-highest value per group?", a: "ROW_NUMBER or DENSE_RANK inside a CTE partitioned by the group, then filter the rank outside the CTE." },
      { q: "What is fan-out and how do you prevent it?", a: "Row multiplication from joining a coarser to a finer grain. Pre-aggregate the finer grain first, then join 1:1." },
      { q: "When would you use HAVING instead of WHERE?", a: "HAVING filters after aggregation, so it is used for conditions on aggregate results." },
    ],
    certificate: {
      title: "DCS Certificate — SQL for Data Work",
      criteria: ["Complete all lessons", "Score 80%+ across module quizzes", "Submit the capstone query pack", "Pass the final assessment"],
    },
  },
  {
    slug: "python-for-data-analysis",
    title: "Python for Data Analysis",
    subtitle: "Pandas, exploratory analysis and communicating findings that change decisions.",
    level: "Beginner",
    hours: 12,
    pathSlugs: ["data-analyst", "data-scientist", "career-switcher", "college-student"],
    overview:
      "A practical Python course focused on the analysis loop: load, inspect, clean, aggregate, visualise, recommend — with portfolio-ready output at every step.",
    objectives: [
      "Work fluently with DataFrames and typed columns",
      "Run a disciplined exploratory data analysis",
      "Aggregate and reshape data for reporting",
      "Turn analysis into a recommendation stakeholders act on",
    ],
    prerequisites: ["Basic Python syntax helps but is not required", "Curiosity about business questions"],
    modules: [
      {
        slug: "dataframes",
        title: "DataFrames and exploration",
        summary: "Load, inspect and reshape data with confidence.",
        difficulty: "Beginner",
        objectives: ["Inspect data quality first", "Select with loc/iloc", "Aggregate with groupby"],
        lessons: [pyPandas],
      },
      {
        slug: "communication",
        title: "Communicating findings",
        summary: "Charts and narratives that drive decisions.",
        difficulty: "Beginner",
        objectives: ["Choose the right encoding", "Write sentence titles", "Structure a recommendation"],
        lessons: [pyViz],
      },
    ],
    capstone: {
      title: "Customer retention analysis and recommendation",
      problem: "A subscription business is losing customers in month two and does not know which segment or why.",
      requirements: [
        "Cohort retention analysis",
        "Segment comparison with statistical sanity checks",
        "Three prioritised recommendations",
        "Reproducible notebook",
      ],
      dataset: "Synthetic subscription dataset — signups, sessions, cancellations (≈120k rows).",
      architecture: ["Ingest", "Clean & type", "Cohort build", "Analysis", "Narrative deck"],
      deliverables: ["Notebook", "GitHub README", "Executive one-pager", "Recorded walkthrough"],
      resumeBullets: [
        "Identified the month-two churn cliff in a 120k-user subscription dataset and proposed three prioritised interventions",
        "Built a reproducible cohort retention notebook adopted as the team's standard analysis template",
      ],
    },
    interviewQuestions: [
      { q: "loc vs iloc?", a: "loc selects by label and is inclusive on slices; iloc selects by integer position and is exclusive on the end." },
      { q: "How do you approach a dataset you have never seen?", a: "Shape, dtypes, nulls, duplicates, distributions, then targeted questions — document issues before analysing." },
      { q: "How do you present an unwelcome finding?", a: "Lead with the finding, show the evidence, state the business impact, then offer options rather than blame." },
    ],
    certificate: {
      title: "DCS Certificate — Python for Data Analysis",
      criteria: ["Complete all lessons", "Score 80%+ across module quizzes", "Submit the capstone notebook", "Pass the final assessment"],
    },
  },
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);

export const getCourseLessons = (course: Course) =>
  course.modules.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })));

export const findLesson = (courseSlug: string, lessonSlug: string) => {
  const course = getCourse(courseSlug);
  if (!course) return undefined;
  const flat = getCourseLessons(course);
  const index = flat.findIndex((x) => x.lesson.slug === lessonSlug);
  if (index === -1) return undefined;
  return {
    course,
    module: flat[index].module,
    lesson: flat[index].lesson,
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index < flat.length - 1 ? flat[index + 1] : undefined,
    index,
    total: flat.length,
  };
};

export const coursesForPath = (pathSlug: string) =>
  COURSES.filter((c) => c.pathSlugs.includes(pathSlug));
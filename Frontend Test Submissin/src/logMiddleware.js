export async function Log(stack, level, pkg, message) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRoYW5yYWowNjA4MjAwNUBnbWFpbC5jb20iLCJleHAiOjE3NTE2OTY1MjIsImlhdCI6MTc1MTY5NTYyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjJhNDE5MWQ2LWYyNzgtNDAxNS1iZDZlLWJkNjkxY2I4ZjFhNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im1hZGhhbiByYWogcCIsInN1YiI6IjM1M2Q2M2UxLWJlZDQtNDYwNy1iN2QxLTc0YzZhY2NkNzk5YyJ9LCJlbWFpbCI6Im1hZGhhbnJhajA2MDgyMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJtYWRoYW4gcmFqIHAiLCJyb2xsTm8iOiIyMTE2MjIwNzAxMTQ4IiwiYWNjZXNzQ29kZSI6ImNXeWFYVyIsImNsaWVudElEIjoiMzUzZDYzZTEtYmVkNC00NjA3LWI3ZDEtNzRjNmFjY2Q3OTljIiwiY2xpZW50U2VjcmV0IjoidmN2ekRwU1J3cUtiV3pWZCJ9.lLbgBgB0NYWoNuqV4HZJGdeo1wfFU8oOx5rorz5lddM"; 

  const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      stack: stack,
      level: level,
      package: pkg,
      message: message,
    }),
  });

  const data = await response.json();
  console.log("Logging result:", data);
}

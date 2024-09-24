export async function getTodos() {
  const res = await fetch("http://localhost:8000/todos");
  const data = await res.json();
  return data;
}
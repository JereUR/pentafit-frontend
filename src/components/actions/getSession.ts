export default async function getSession() {
  let session = null
  await fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((json) => {
      session = json
    })

  return { session }
}

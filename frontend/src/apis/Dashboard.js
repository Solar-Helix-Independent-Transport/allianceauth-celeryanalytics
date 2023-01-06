import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";

export async function loadQueue() {
  const api = await axios.get(`/celery/api/celery/queue/`);
  console.log(`get queue in api`);
  console.log(api);
  return api.data;
}
export async function loadActive() {
  const api = await axios.get(`/celery/api/celery/active/`);
  console.log(`get  active in api`);
  console.log(api);
  return api.data;
}
export async function loadWorkers() {
  const api = await axios.get(`/celery/api/celery/status/`);
  console.log(`get status in api`);
  console.log(api);
  return api.data;
}
export async function loadETAs() {
  const api = await axios.get(`/celery/api/celery/eta/`);
  console.log(`get ETA in api`);
  console.log(api);
  return api.data;
}

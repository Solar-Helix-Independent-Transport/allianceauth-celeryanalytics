import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFToken";

export async function loadDash() {
  const api = await axios.get(`/celery/api/celery/queue`);
  console.log(`get queue in api`);
  console.log(api);
  return api.data;
}

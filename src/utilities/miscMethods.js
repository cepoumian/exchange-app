const checkRequestStatus = (res) => {
  if (res.ok) {
    return res;
  }
  throw new Error('Request came back as either 404 or 500');
}

const json = (res) => {
  return res.json();
}

export { checkRequestStatus, json };
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCaseById(id: string) {
  const response = await fetch(`${API_URL}/cases/${id}`);
  
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  });
};

export async function getCases() {
  const response = await fetch(`${API_URL}/cases`);

  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  });
};

export async function createCase() {
  const response = await fetch(`${API_URL}/cases`, { method: 'POST' });

  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    } else {
      reject(response);
    }
  });
};
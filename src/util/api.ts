import { OptionSelectedCombo, PickupInfo } from "@/typings/types";
import store from "@/store";

const base_url = "http://127.0.0.1:8001/api";

const headers = {
  "content-type": "application/json",
};

export async function emailUsed(email: string): Promise<boolean> {
  console.log(email);
  return await fetch(
    `${base_url}/emailCheck/?` + new URLSearchParams({ email }),
    {
      method: "GET",
      headers,
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json.used);
      return json.used;
    });
}

export async function register(email: string, password: string) {
  return await fetch(`${base_url}/register/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((json) => {
      return json.url !== undefined;
    });
}

export async function login(email: string, password: string) {
  return await fetch(`${base_url}/api-token-auth/`, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({ username: email, password }),
  })
    .then((response) => response.json())
    .then((json) => {
      store.commit("SET_TOKEN", json);
      return json;
    });
}

export async function get_member_data() {
  return await fetch(`${base_url}/get_member_data/`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Token ${store.state.token}`,
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      store.commit("SET_MEMBER_DATA", json);
      return json;
    });
}

export async function update_member_data(
  name: string,
  cellphone: string,
  carrier: string | null
) {
  return await fetch(`${base_url}/update_member_data/`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Token ${store.state.token}`,
    },
    body: JSON.stringify({ name, cellphone, carrier }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => {
      store.commit("SET_MEMBER_DATA", json);
      return json;
    });
}

export async function new_order(
  email: string,
  name: string,
  member_id: number | null,
  pickupInfo: PickupInfo,
  carrier: string | null,
  phone: string,
  comments: string,
  cart: OptionSelectedCombo[]
) {
  return await fetch(`${base_url}/new_order/`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      name,
      member_id,
      pickupInfo,
      phone,
      comments,
      cart,
    }),
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

export async function get_member_orders() {
  return await fetch(`${base_url}/member_order_list/`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Token ${store.state.token}`,
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

export async function get_combos_info() {
  return await fetch(`${base_url}/get_combos/`, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

export async function get_combo(id: number) {
  return await fetch(`${base_url}/test/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

export async function get_stores() {
  return await fetch(`${base_url}/get_stores/`, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

export async function get_order_detail(id: number) {
  return await fetch(`${base_url}/get_order/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((json) => json.data);
}

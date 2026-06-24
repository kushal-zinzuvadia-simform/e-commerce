export const patterns = {
  address: /^[a-zA-Z0-9\s.,#/-]{5,100}$/,
  city: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
  name: /^[a-zA-Z]+$/,
  phone: /^\d{10}$/,
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
};

// API cho tỉnh thành phố từ open.oapi.vn

const getProvinces = async () => {
  try {
    const response = await fetch("https://open.oapi.vn/location/provinces?page=0&size=100");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get provinces API call failed:", error);
    throw error;
  }
};

const getDistricts = async (provinceId) => {
  try {
    const response = await fetch(`https://open.oapi.vn/location/districts/${provinceId}?page=0&size=100`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get districts API call failed:", error);
    throw error;
  }
};

const getWards = async (districtId) => {
  try {
    const response = await fetch(`https://open.oapi.vn/location/wards/${districtId}?page=0&size=100`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get wards API call failed:", error);
    throw error;
  }
};

export {
  getProvinces,
  getDistricts,
  getWards
};

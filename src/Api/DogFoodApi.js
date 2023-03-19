
class DogFoodApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getAuthorizationToken(token) {
    return `Bearer ${token}`;
  }

  checkToken(token) {
    if (!token) throw new Error("Отсутствует токен");
  }

  getProductsByIds(ids, token) {
    this.checkToken(token);
    return Promise.all(
      ids.map((id) =>
        fetch(`${this.baseUrl}/products/${id}`, {
          headers: {
            authorization: this.getAuthorizationToken(token),
          },
        }).then((res) => res.json())
      )
    );
  }

  async getAllProducts(search, token) {
    this.checkToken(token);
    const response = await fetch(
      `${this.baseUrl}/products/search?query=${search}`,
      {
        headers: {
          authorization: this.getAuthorizationToken(token),
        },
      }
    );

    if (response.status >= 400) {
      throw new Error(
        `${response.status}: Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`
      );
    }
    return response.json();
  }

  async getUserByToken(token) {

    const res = await fetch(`${this.baseUrl}/v2/sm9/users/me`, {
      headers: {
        authorization: this.getAuthorizationToken(token),
      },
    });
    console.log("getUserByToken", res);
    return res.json();
  }
}

export const DogFoodApiConst = new DogFoodApi({
  baseUrl: "https://api.react-learning.ru",
});

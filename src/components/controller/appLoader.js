import Loader from "./loader";

class AppLoader extends Loader {
  constructor() {
    super("https://newsapi.org/v2/", {
      apiKey: "bdb9f59aef754244bedf2ddd480ebf85", // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;

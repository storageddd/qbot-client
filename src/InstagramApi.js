import { IgApiClient } from 'instagram-private-api';

class InstagramApi {

  static _instance = null;

  constructor() {
    if (InstagramApi._instance) {
      throw new Error("Instantiation failed: use InstagramApi.getInstance() instead of new.");
    }

    InstagramApi._instance = this;
  }

  static getInstance() {
    if (!InstagramApi._instance) {
      InstagramApi._instance = new IgApiClient();
    }

    return InstagramApi._instance;
  }

  static destroy() {
    InstagramApi._instance = null;
  }

}

export default InstagramApi;

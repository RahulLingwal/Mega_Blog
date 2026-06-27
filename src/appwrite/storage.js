import env from "../env/env";
import { Client, ID, Storage } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client.setEndpoint(env.appwriteUrl).setProject(env.appwriteProductId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: env.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: env.appwriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: env.appwriteBucketId,
      fileId,
    });
  }
}

const storageService = new StorageService();
export default storageService;

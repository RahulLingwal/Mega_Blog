import env from "../env/env";
import { Client, TablesDB, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  database;

  constructor() {
    this.client.setEndpoint(env.appwriteUrl).setProject(env.appwriteProductId);
    this.database = new TablesDB(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createRow({
        databaseID: env.appwriteDatabaseId,
        tableId: env.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.database.updateRow({
        databaseId: env.appwriteDatabaseId,
        tableId: env.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteRow({
        databaseID: env.appwriteDatabaseId,
        tableId: env.appwriteTableId,
        rowId: slug,
      });

      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getRow({
        databaseId: env.appwriteDatabaseId,
        tableId: env.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(query = [Query.equal("status", "active")]) {
    try {
      return await this.database.listRows({
        databaseId: env.appwriteDatabaseId,
        tableId: env.appwriteTableId,
        query,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
}

const dataService = new DatabaseService();
export default dataService;

import axios, { AxiosResponse } from "axios";

interface RbacHttpConfig {
  baseUrl: string;
  headers: Record<string, string>;
  withCredentials?: boolean;
}

interface RbacItemChild {
  parent: string;
  child: string;
}

export default class RbacHttpItemChildAdapter {
  private config: RbacHttpConfig;

  constructor(config: RbacHttpConfig) {
    this.config = config;
  }

  async store(rbacItemChildren: RbacItemChild[]): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/item-children`,
        { rbacItemChildren },
        {
          headers: this.config.headers,
          withCredentials: this.config.withCredentials,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unknown error.");
      }
    }
  }

  async load(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/item-children`,
        {
          headers: this.config.headers,
          withCredentials: this.config.withCredentials,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unknown error.");
      }
    }
  }

  async create(parent: string, child: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/item-children`,
        { parent, child },
        {
          headers: this.config.headers,
          withCredentials: this.config.withCredentials,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unknown error.");
      }
    }
  }

  async findByParent(parent: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/item-children/${parent}`,
        {
          headers: this.config.headers,
          withCredentials: this.config.withCredentials,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Unknown error.");
      }
    }
  }
}

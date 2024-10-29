import axios, { AxiosResponse } from 'axios';

interface RbacHttpConfig {
  baseUrl: string;
  headers: Record<string, string>;
  withCredentials?: boolean;
}

interface RbacItem {
  name: string;
  type: string;
  rule?: string;
}

export default class RbacHttpItemAdapter {
  private config: RbacHttpConfig;

  constructor(config: RbacHttpConfig) {
    this.config = config;
  }

  async store(rbacItems: RbacItem[]): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/items`,
        { rbacItems },
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
        `${this.config.baseUrl}/rbac/items`,
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

  async create(name: string, type: string, rule?: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/items`,
        { name, type, rule },
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

  async find(name: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/items/${name}`,
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

  async findByType(type: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/items/${type}s`,
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

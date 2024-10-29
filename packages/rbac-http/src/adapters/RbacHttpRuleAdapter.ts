import axios, { AxiosResponse } from "axios";

interface RbacHttpConfig {
  baseUrl: string;
  headers: Record<string, string>;
  withCredentials?: boolean;
}

interface RbacRule {
  name: string;
}

export default class RbacHttpRuleAdapter {
  private config: RbacHttpConfig;

  constructor(config: RbacHttpConfig) {
    this.config = config;
  }

  async store(rbacRules: RbacRule[]): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/rules`,
        { rbacRules },
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
        `${this.config.baseUrl}/rbac/rules`,
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

  async create(name: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/rules`,
        { name },
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

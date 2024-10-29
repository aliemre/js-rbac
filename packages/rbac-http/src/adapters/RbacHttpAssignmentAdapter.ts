import axios, { AxiosResponse } from 'axios';

interface RbacHttpConfig {
  baseUrl: string;
  headers: Record<string, string>;
  withCredentials?: boolean;
}

interface RbacAssignment {
  userId: string;
  role: string;
}

export default class RbacHttpAssignmentAdapter {
  private config: RbacHttpConfig;

  constructor(config: RbacHttpConfig) {
    this.config = config;
  }

  async store(rbacAssignments: RbacAssignment[]): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/assignments`,
        { rbacAssignments },
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
        throw new Error(error.toString());
      }
    }
  }

  async load(): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/assignments`,
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
        throw new Error(error.toString());
      }
    }
  }

  async create(userId: string, role: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${this.config.baseUrl}/rbac/assignments`,
        { userId, role },
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
        throw new Error(error.toString());
      }
    }
  }

  async find(userId: string, role: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/assignments/${userId}/${role}`,
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
        throw new Error(error.toString());
      }
    }
  }

  async findByUserId(userId: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${this.config.baseUrl}/rbac/assignments/${userId}`,
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
        throw new Error(error.toString());
      }
    }
  }

  async delete(userId: string, role: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `${this.config.baseUrl}/rbac/assignments/${userId}/${role}`,
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
        throw new Error(error.toString());
      }
    }
  }

  async deleteByUser(userId: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `${this.config.baseUrl}/rbac/assignments/${userId}`,
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
        throw new Error(error.toString());
      }
    }
  }
}

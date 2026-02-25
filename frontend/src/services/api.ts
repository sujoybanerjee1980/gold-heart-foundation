import axios, { AxiosInstance } from 'axios';
import { ApiResponse, Product, Sale, Report } from '@/types/index';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const response = await this.api.get<ApiResponse<Product[]>>('/products');
    return response.data.data || [];
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data!;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const response = await this.api.post<ApiResponse<Product>>('/products', product);
    return response.data.data!;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await this.api.put<ApiResponse<Product>>(`/products/${id}`, product);
    return response.data.data!;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.api.delete(`/products/${id}`);
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    const response = await this.api.get<ApiResponse<Sale[]>>('/sales');
    return response.data.data || [];
  }

  async getSale(id: number): Promise<Sale> {
    const response = await this.api.get<ApiResponse<Sale>>(`/sales/${id}`);
    return response.data.data!;
  }

  async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
    const response = await this.api.post<ApiResponse<Sale>>('/sales', sale);
    return response.data.data!;
  }

  async updateSale(id: number, sale: Partial<Sale>): Promise<Sale> {
    const response = await this.api.put<ApiResponse<Sale>>(`/sales/${id}`, sale);
    return response.data.data!;
  }

  async deleteSale(id: number): Promise<void> {
    await this.api.delete(`/sales/${id}`);
  }

  // Reports
  async getReports(): Promise<Report[]> {
    const response = await this.api.get<ApiResponse<Report[]>>('/reports');
    return response.data.data || [];
  }

  async generateReport(type: string, filters?: any): Promise<Report> {
    const response = await this.api.post<ApiResponse<Report>>('/reports/generate', { type, filters });
    return response.data.data!;
  }

  // Dashboard Statistics
  async getDashboardStats(): Promise<any> {
    const response = await this.api.get<ApiResponse<any>>('/dashboard/stats');
    return response.data.data || {};
  }
}

export default new ApiService();

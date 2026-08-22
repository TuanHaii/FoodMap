import axios from 'axios';
import { apiBaseUrl } from '../../shared/config/env';

/** Infrastructure adapter; TODO: add the approved Sanctum token handling. */
export const apiClient = axios.create({ baseURL: apiBaseUrl });

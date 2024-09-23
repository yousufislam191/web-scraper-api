export interface ErrorResponseParams {
  statusCode?: number;
  message?: string;
}

export interface SuccessResponseParams {
  statusCode?: number;
  message?: string;
  payload?: any;
}
export interface JobData {
  title: string;
  team: string;
  vacancy: string;
  salary: string;
  href: string;
}

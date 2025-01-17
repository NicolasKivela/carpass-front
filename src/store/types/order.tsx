export interface Order {
  id: number;
  created_at: string;
  updated_at: string;
  customer_id: number;
  inspector_id: number;
  inspection_organization_id: number;
  customer_organization_id: number;
  registration_number: string;
  car_production_number: string;
  brand_and_model: string;
  report_type: string;
  engine_type: string;
  additional_information?: string;
  additional_information2?: string;
  order_total_amount: number;
  order_status: string;
  report_id: number;
  delivery_date: string | null;
}

export type CreateOrder = Omit<
  Order,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'customer_id'
  | 'inspector_id'
  | 'customer_organization_id'
  | 'order_total_amount'
  | 'order_status'
  | 'report_id'
  | 'delivery_date'
>;

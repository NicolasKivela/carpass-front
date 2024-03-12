export interface Report {
  brand_and_model: string;
  odometer_reading: number;
  production_number: string;
  registration_number: string;
  engine_type: EngineType;
  report_rows: {
    question_id: number;
    inspection_status: InspectionStatus;
    comment: string;
    attachment: Attachment[];
  }[];
}

export interface Attachment {
  attachment_type: AttachmentType;
  data: string;
}

export type EngineType =
  | 'petrol'
  | 'diesel'
  | 'hybrid'
  | 'hybrid_diesel'
  | 'hybrid_gasoline'
  | 'electric';

export type ReportType = 'full' | 'light' | 'narrow';

export type AttachmentType = 'image' | 'video';

export type InspectionStatus = 'red' | 'yellow' | 'green';

export type Language = 'en' | 'fi';

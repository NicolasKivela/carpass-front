export interface Report {
  registration_number: string;
  engine_type: EngineType;
  brand_and_model: string;
  odometer_reading: number | null;
  production_number: string;
  report_structure: {
    id: number;
    name: string;
    questions: {
      question: {
        id: number;
        name: string;
      };
    }[];
  }[];
  report_rows: {
    question_id: number | null;
    inspection_status: InspectionStatus | null;
    comment: string;
    attachments: Attachment[];
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

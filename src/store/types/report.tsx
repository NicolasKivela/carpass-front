export interface Report {
  registration_number: string;
  engine_type: EngineType;
  brand_and_model: string;
  odometer_reading: number | null;
  production_number: string;
  report_structure: ReportStructureItem[];
  report_rows: ReportRow[];
}

export interface Attachment {
  id: string;
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

export type ReportStructureItem = {
  id: number;
  name: string;
  questions: {
    question: {
      id: number;
      name: string;
      type: string;
    };
  }[];
};

export type ReportRow = {
  question_id: number | null;
  inspection_status: InspectionStatus | null;
  comment: string;
  attachments: Attachment[];
  input_left: number;
  input_left_measurement: String;
  input_right: number;
  input_right_measurement: String;
  additional_input: number;
  additional_input_measurement: String;
};

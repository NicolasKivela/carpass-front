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
    id: number;
    name: string;
  }[];
};

export type ReportRow = {
  question_id: number | null;
  inspection_status: InspectionStatus | null;
  comment: string;
  attachments: Attachment[];
};

export type ReportSection = {
  id: number,
  created_at: string;
  updated_at: string;
  unit_price: number;
  translations: Array<{value: string}>
}
export type ReportSections = {
  sections: Array<ReportSection>
}
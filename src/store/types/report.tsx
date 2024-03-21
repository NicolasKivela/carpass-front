export interface Report {
  brand_and_model: string;
  odometer_reading: number | null;
  production_number: string;
  registeration_number: string;
  engine_type: EngineType;
  report_structure: {
    id: number;
    translations: {[key: string]: string};
    question_map: {
      question: {
        id: number;
        translations: {[key: string]: string};
      };
    }[];
  }[];
  report_rows: {
    question_id: number | null;
    inspection_status: InspectionStatus | null;
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

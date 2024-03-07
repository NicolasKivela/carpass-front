export interface Report {
  brand_and_model: string;
  odometer_reading: Number | null;
  production_number: string;
  registration_number: string;
  report_type: string;
  report_rows: {
    question_id: string;
    question: string;
    inspection_status: string | null;
    comment: string;
    attachments: Attachment[];
  }[];
}

export interface Attachment {
  id: string;
  attachment_type: string;
  data: BinaryData | null;
}

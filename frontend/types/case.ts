export enum Status {
    Submitted = "submitted",
    Processing = "processing",
    Completed = "completed"
}

export interface Option {
    key: string;
    text: string;
    selected: boolean;
}

export interface Evidence {
    content: string;
    page_number: number;
    pdf_name: string;
    event_datetime: string;
}

export interface Step {
    key: number;
    question: string;
    options: Option[];
    reasoning: string;
    decision: string;
    next_step: string;
    is_met: boolean;
    is_final: boolean;
    evidence: Evidence[];
}

export interface Case {
    id: number;
    created_at: Date;
    status: Status;
    procedure_name: string;
    cpt_codes: string[];
    summary: string;
    is_met: boolean;
    is_complete: boolean;
    steps: Step[];
}

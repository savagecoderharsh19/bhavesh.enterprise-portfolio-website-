export const EnquiryStatus = {
    NEW: 'NEW',
    UNDER_REVIEW: 'UNDER_REVIEW',
    RESPONDED: 'RESPONDED',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED'
} as const;

export type EnquiryStatusType = typeof EnquiryStatus[keyof typeof EnquiryStatus];

export function isValidStatus(status: unknown): status is EnquiryStatusType {
    return typeof status === 'string' && Object.values(EnquiryStatus).includes(status as EnquiryStatusType);
}

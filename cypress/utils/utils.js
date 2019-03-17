import { COLUMNS } from "../constants/fields";

/** 
 * @param {string} status - user's status
 */
export function getColumnSelector(status) {
    switch(status) {
        case "Applied":
            return COLUMNS.APPLIED_COLUMN;
        case "Interviewing":
            return COLUMNS.INTERVIEWING_COLUMN;
        default:
            return COLUMNS.HIRED_COLUMN;        
    }
}

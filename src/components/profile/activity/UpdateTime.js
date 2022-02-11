import { dateToLocalFormat } from 'date-format-ms';
export default function Time ({date}) {
    return (dateToLocalFormat(new Date(date), 'i'));
}

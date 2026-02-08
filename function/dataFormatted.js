import { DateTime } from "luxon"

const dataFormatted = (date) => DateTime.fromObject(date).toLocaleString()

export default dataFormatted


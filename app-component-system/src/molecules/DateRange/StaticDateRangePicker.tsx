import  { StaticDateRangePicker as MuiStaticDateRangePicker } from '@mui/x-date-pickers-pro'
import { memo } from 'react'

import type { StaticDateRangePickerProps } from '@mui/x-date-pickers-pro'

function StaticDateRangePicker<TDate>(props: StaticDateRangePickerProps<TDate>) {
  return (
    <MuiStaticDateRangePicker
      {...props}
    />
  )
}

export default memo(StaticDateRangePicker)

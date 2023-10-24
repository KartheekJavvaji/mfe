import  { StaticDateRangePicker as MuiStaticDateRangePicker } from '@mui/x-date-pickers-pro'
import { memo } from 'react'

import DateRangeLocalizationProvider from './DateRangeLocalizationProvider'

import type { StaticDateRangePickerProps } from '@mui/x-date-pickers-pro'

function StaticDateRangePicker<TDate>(props: StaticDateRangePickerProps<TDate>) {
  return (
    <DateRangeLocalizationProvider>
      <MuiStaticDateRangePicker
        {...props}
      />
    </DateRangeLocalizationProvider>
  )
}

export default memo(StaticDateRangePicker)

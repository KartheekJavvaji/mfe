import { MultiInputDateTimeRangeField as MuiMultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro//MultiInputDateTimeRangeField';
import { memo } from 'react'

import DateRangeLocalizationProvider from './DateRangeLocalizationProvider'

import type { MultiInputDateTimeRangeFieldProps } from '@mui/x-date-pickers-pro'

function MultiInputDateTimeRangeField<TDate>(props: MultiInputDateTimeRangeFieldProps<TDate>) {
  return (
    <DateRangeLocalizationProvider>
      <MuiMultiInputDateTimeRangeField
        {...props}
      />
    </DateRangeLocalizationProvider>
  )
}

export default memo(MultiInputDateTimeRangeField)

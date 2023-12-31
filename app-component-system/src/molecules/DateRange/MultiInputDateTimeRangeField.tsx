import { MultiInputDateTimeRangeField as MuiMultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro//MultiInputDateTimeRangeField';
import { memo } from 'react'

import type { MultiInputDateTimeRangeFieldProps } from '@mui/x-date-pickers-pro'

function MultiInputDateTimeRangeField<TDate>(props: MultiInputDateTimeRangeFieldProps<TDate>) {
  return (
    <MuiMultiInputDateTimeRangeField
      {...props}
    />
  )
}

export default memo(MultiInputDateTimeRangeField)
